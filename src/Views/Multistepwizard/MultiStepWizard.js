import React, { Component } from "react";
import "./MultiStepWizard.css";
import Select from "react-select";
import { addNotification } from "../../redux/actions";
import Dropdown from "../../Components/Dropdown";
import {
  CAREER_LEVEL,
  EDUCTATION,
  EXPERIENCE,
  GENDER,
  JOB_TYPE,
  SKILLS,
} from "../../Constants/Constants";
import TextArea from "../../Components/TextArea";
import InputField from "../../Components/Input";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import ToggleableInput from "../../Components/ToggleableInput";
import { Validator } from "../../Utlities/Validation";
import { toast } from "react-toastify";
import { postUsers } from "../../service/api";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const weekdays = [
  { value: "Monday", label: "M" },
  { value: "Tuesday", label: "T" },
  { value: "Wednesday", label: "W" },
  { value: "Thursday", label: "T" },
  { value: "Friday", label: "F" },
  { value: "Saturday", label: "S" },
  { value: "Sunday", label: "S" },
];
class MultiStepWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      jobTitle: "",
      experience: "",
      education: "",
      skills: "",
      description: "",
      hourlyRate: "",
      startDate: "",
      careerLevel: "",
      gender: "",
      equipment: "",
      selectedDays: [],
      selectedTime: {
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: "",
      },
      image: "",
      stepOneStatus: false,
      stepTwoStatus: false,
      stepThreeStatus: false,
      errors: {},
    };
  }
  componentDidMount() {
    console.log(this.props.notifications);
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleStepChange = (step, direction) => {
    console.log(this.state);
    if (direction === "prev") {
      if (step - 1 > 0) {
        this.setState({ step: step - 1 });
      } else {
        return;
      }
    }

    if (direction == "next") {
      if (step == 1) {
        let errors = Validator(this.state);
        if (Validator(this.state)) {
          this.setState({
            errors: errors,
          });
          toast.error("Please fix highlighted errors!");
          return;
        }
      }
      if (step + 1 < 4) {
        this.setState({ step: step + 1 });
      } else {
        this.handleSubmit();
        // return;
      }
    }
    {
      if (step == 1) this.setState({ stepOneStatus: true });
      if (step == 2) this.setState({ stepTwoStatus: true });
      if (step == 3) this.setState({ stepThreeStatus: true });
    }
  };

  handleDaySelection = (day) => {
    const { selectedDays } = this.state;
    const updatedSelectedDays = [...selectedDays];

    if (updatedSelectedDays.includes(day)) {
      updatedSelectedDays.splice(updatedSelectedDays.indexOf(day), 1);
    } else {
      updatedSelectedDays.push(day);
    }

    this.setState({ selectedDays: updatedSelectedDays });
  };
  onUpload = (event) => {
    const { files } = event.target;
    this.setState({ image: files[0] });
    this.setState({
      errors: Validator({ ...this.state, image: files[0] }),
    });
  };
  handleSubmit = () => {
    const {
      jobTitle,
      experience,
      education,
      skills,
      description,
      hourlyRate,
      startDate,
      careerLevel,
      gender,
      equipment,
      selectedDays,
      selectedTime,
    } = this.state;
    const dto = {
      jobTitle,
      experience,
      education,
      skills,
      description,
      hourlyRate,
      startDate,
      careerLevel,
      gender,
      equipment,
      selectedDays,
      selectedTime,
    };
    postUsers(dto).then((res) => {
      this.props.pushNotification(
        { 
          UTC: new Date().getTime(),
          list: [
            {
              type: "Info",
              content: "Job Application has been added",
              count: 1,
            },
          ],
        },
      );
      this.props.history.push('/')
      toast.success("User Successfully Submitted");
    });
    // Handle form submission logic
  };
  handleDropdown = (event) => {
    const { name, value } = event.target;
    this.setState({
      errors: Validator({ ...this.state, [name]: value }),
    });

    this.setState({ [name]: value });
  };
  handleTimeInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      selectedTime: { ...this.state.selectedTime, [name]: value },
    });
  };
  render() {
    const {
      step,
      jobTitle,
      experience,
      education,
      skills,
      description,
      hourlyRate,
      startDate,
      careerLevel,
      gender,
      equipment,
      selectedDays,
      selectedTime,
      stepOneStatus,
      stepTwoStatus,
      stepThreeStatus,
      errors,
    } = this.state;

    return (
      <div className="wizard-container">
        <div className="wizard-header">
          <p className="job-heading">CREATE A JOB POST</p>
          <p className="job-text">
            Complete the following steps to create an effective job post
          </p>
        </div>
        <p className="status-number">Step {step} of 3</p>
        <div className="status-bar">
          <div
            className={`status-item ${
              step === 1 && !stepTwoStatus && !stepThreeStatus ? "active" : ""
            } ${stepOneStatus ? "visited" : " "}`}
          >
            <p className="">Job Information</p>
          </div>
          <div
            className={`status-item ${
              step === 2 && !stepThreeStatus ? "active" : ""
            } ${stepTwoStatus ? "visited" : ""}`}
          >
            <p className=" ">Candidate Timings</p>
          </div>
          <div
            className={`status-item ${step === 3 ? "active" : ""} ${
              stepThreeStatus ? "visited" : " "
            }`}
          >
            <p className=""> Shift Timings</p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="wizard-form">
          {/* Step 1: Job Information */}
          {step === 1 && (
            <div className="wizard-step">
              <div className="row">
                <Dropdown
                  className="form-input"
                  label={"Looking for"}
                  options={JOB_TYPE}
                  name="jobTitle"
                  value={jobTitle}
                  onChange={this.handleDropdown}
                  errors={errors.jobTitle}
                />

                <Dropdown
                  className="form-input"
                  label={"Experience"}
                  options={EXPERIENCE}
                  name="experience"
                  value={experience}
                  onChange={this.handleDropdown}
                  errors={errors.experience}
                />
              </div>
              <div className="row">
                <Dropdown
                  className="form-input"
                  label="Education"
                  options={EDUCTATION}
                  name="education"
                  value={education}
                  onChange={this.handleDropdown}
                />
                <Dropdown
                  className="form-input"
                  label={"Skills"}
                  name="skills"
                  value={skills}
                  options={SKILLS}
                  onChange={this.handleDropdown}
                />
              </div>

              <div className="row">
                <TextArea
                  label="Description"
                  value={description}
                  className="text-area"
                  name="description"
                  onChange={this.handleInputChange}
                />
              </div>
              <p className="uploading_text">Add if there is any inspiration</p>
              <div class="upload-btn-wrapper">
                <button class="btn">GO TO SELECT TEMPLATE</button>
                <input onChange={this.onUpload} type="file" name="myfile" />
              </div>
              {errors.image && <div className="error">{errors.image}</div>}
            </div>
          )}

          {/* Step 2: Candidate Type */}
          {step === 2 && (
            <div className="wizard-step">
              <div className="row">
                <InputField
                  className="form-input"
                  label={"Hourly Rate"}
                  type="number"
                  name="hourlyRate"
                  value={hourlyRate}
                  onChange={this.handleInputChange}
                  placeholder="Enter value..."
                />

                <InputField
                  className="form-input"
                  label={"Expected Start Date"}
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={this.handleInputChange}
                  placeholder="Select Date..."
                />
              </div>
              <div className="row">
                <Dropdown
                  className="form-input"
                  label={"Career Level"}
                  options={CAREER_LEVEL}
                  value={careerLevel}
                  name="careerLevel"
                  onChange={this.handleDropdown}
                />
                <Dropdown
                  className="form-input"
                  label={"Gender"}
                  options={GENDER}
                  value={gender}
                  name="gender"
                  onChange={this.handleDropdown}
                />
              </div>
              <div className="row">
                <TextArea
                  label="Equipment Specification"
                  value={equipment}
                  name="equipment"
                  className="text-area"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          )}

          {/* Step 3: Shift Timings */}
          {step === 3 && (
            <div className="wizard-step">
              {/* Day selection */}
              <div className="step-3-container">
                <p className="step-3-heading">
                  Schedule Working Days & Timings
                </p>
              </div>
              <div className="weekdays-container">
                {weekdays.map((weekday) => (
                  <div
                    key={weekday.value}
                    className={`weekday ${
                      selectedDays.includes(weekday.value) ? "selected" : ""
                    }`}
                    onClick={() => this.handleDaySelection(weekday.value)}
                  >
                    {weekday.label}
                  </div>
                ))}
              </div>

              {/* Time input */}
              <div className="flex flex-row justify-between flex-wrap">
                {weekdays.map((weekday) => (
                  <ToggleableInput
                    disabled={
                      selectedDays.includes(weekday.value) ? false : true
                    }
                    name={weekday.value}
                    text={weekday.value}
                    value={selectedTime[weekday.value]}
                    onChange={this.handleTimeInput}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="actions-container">
            <button
              className="prev-btn"
              type="button"
              onClick={() => this.handleStepChange(step, "prev")}
            >
              Previous
            </button>
            <button
              className="next-btn"
              type="button"
              onClick={() => this.handleStepChange(step, "next")}
            >
              {this.state.step == 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    pushNotification: (params) => dispatch(addNotification(params)),
  };
};
const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MultiStepWizard));
