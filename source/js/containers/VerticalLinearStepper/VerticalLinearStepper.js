import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const items = [
    <MenuItem key={1} value={1} primaryText="Male" />,
    <MenuItem key={2} value={2} primaryText="Female" />
];



/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {

    state = {
        finished: false,
        stepIndex: 0,
        value: null
    };


    handleChange = (event, index, value) => this.setState({value});


    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                    />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                        />
                )}
            </div>
        );
    }

    render() {
        const {finished, stepIndex} = this.state;

        return (
            <div style={{maxWidth: 380, maxHeight: '100%', margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Select campaign settings</StepLabel>
                        <StepContent>
                            <TextField hintText="Enter First Name" hintStyle={{fontStyle:'italic',fontSize:'14px'}} floatingLabelText="First Name" />
                            <TextField hintText="Enter Last Name" hintStyle={{fontStyle:'italic',fontSize:'14px'}} floatingLabelText="Last Name" />
                            <TextField hintText="Enter Occupation" hintStyle={{fontStyle:'italic',fontSize:'14px'}} floatingLabelText="Occupation" />
                            <SelectField
                                value={this.state.value}
                                floatingLabelText="Gender"
                                onChange={this.handleChange}
                                >
                                {items}
                            </SelectField>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad group</StepLabel>
                        <StepContent>
                            <p>Please select date of birth</p>
                            <DatePicker hintText="Select date of birth" />
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                        <StepContent>
                            <p>
                                Try out different ad text to see what brings in the most customers,
                                and learn how to enhance your ads using features like ad extensions.
                                If you run into any problems with your ads, find out how to tell if
                                they're running and how to resolve approval issues.
                            </p>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{margin: '20px 0', textAlign: 'center'}}>
                        <a
                            href="#"
                            onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
                            >
                            Click here
                        </a> to reset the example.

                    </p>
                )}
                <Snackbar
                    open={finished}
                    action="undo"
                    message={'You have finished'}
                    autoHideDuration={2000}
                    />
            </div>
        );
    }
}

export default VerticalLinearStepper;