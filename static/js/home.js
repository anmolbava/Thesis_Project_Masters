class ChangeState
{
    /* This class is used to change the current form in the view */
    constructor(object = null)
    {
        /* The constructor of the class */
        this.object = object; 
        this.page = "LOGIN";
    }

    changePage = (name) =>
    {
        /* This procedure is used the current form to another form define by the given parameter.
            Input data:
                page(String): the form to switch for.
            Output data:
                Null
            changePage(page) => Null. 
        */

        let page_login = document.getElementsByClassName("login-form")[0];
        let page_register = document.getElementsByClassName("register-form")[0];
        let page_name = document.getElementsByClassName("page-name")[0]
        if (name == "login")
        {
            page_register.style.display = "none";
            page_login.style.display = "block";
            page_name.innerHTML = "LOGIN PAGE";
        }
        else if (name == "register")
        {
            page_login.style.display = "none";
            page_register.style.display = "block";
            page_name.innerHTML = "REGISTER PAGE";            
        }
        
    }
}

class Validateform
{
    /* This class is used to verif the form */ 
    constructor()
    {
        /* The constructor of the class */  
        this.page = "none";
        this.alert_message_label = null;
        this.something_is_show = false;
    }

    validateEmail = (email) =>
    {
        /*  This function is used to validate the email adress and return true if the format of 
            the email is good else return false.
            Input data:
                email(String): The email to verif.
            Ouput data:
                output(Booleen): The truth value of the verification.
            validateEmail(email) => booleen.
        */

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const output = re.test(String(email).toLowerCase());
        return output
    }

    validateForm = (name) => 
    {
        /*  This procedure is used to verif the fields of the form if any field is bad filled in 
            an error is displayed on the view.
            Input data:
                name(String): The custom name of form to verif.
            Output data:
                Null
            validateForm(name) => Null.
        */

        let error = false;
        this.alert_message_label =  document.getElementsByClassName("message-alert")[0];
        let form_class = "";
        if (name == "login")
        {
            // If current for is the login form page get fields value and verif it 
            let username_field = document.getElementsByName("login-field")[0];
            let otp_field = document.getElementsByName("otp-field")[0];
            if (username_field.value.trim() == "" || otp_field.value == "")
            {
                error = true;
                this.page = "login-form";

                //Give the focus to username_field
                username_field.focus();
            }
            form_class = "login-form";
        }
        else if (name == "register")
        {
            // If the current form is the register form page get fields value and verif it 
            let username_field = document.getElementsByName("username-field")[0];
            let email_field = document.getElementsByName("otp-field")[0];
            if (username_field.value.trim() == "" || this.validateEmail(email_field.value.trim()) == true)
            {
                error = true;
                
                //Give the focus to username_field
                username_field.focus();
            }
            form_class = "register-form";
        }

        if(error == true)
        {
            // if an error was occured
            this.something_is_show = true;
            if (this.alert_message_label.classList.contains("valide") == true)
            {
                this.alert_message_label.classList.remove("valide");
            }
            
            //change margin 
            let form = document.getElementsByClassName(form_class)[0];
            form.style.marginTop = "5%";

            //display message
            this.alert_message_label.style.display = "block";
            this.alert_message_label.firstElementChild.innerHTML = "Please fill in all the fields.";
        }
        else
        {
            this.something_is_show = false;
        }
    }
}

class RecordMicrophoneViewer
{
    /*
        This class is used to inform user about microphone recording
    */
    constructor()
    {
        /* This is the constructor of the class */
        this.state_record = false;
        this.recorder_label = null;
        this.textObj = null;
        this.time = 0;
        this.timeIntervalObj = null;
        this.functionToCall = (arg) => null;
    }

    format = (number) =>
    {
        /*  This function is used to format a number if it is a one digit into two digits number.
            Input data:
                number(integer): The number to format.
            Output data:
                string(String): The formated number as a string.
            format(number) => string.
        */
        let strC = number.toString();
        let string = ((strC.length <= 1)?"0":"") + strC;
        return string;
    }

    timeDiplayer = () => 
    {
        /*  This procedure is used to compute and display in real time the recorded time.
            timeDisplayer() => Null.
        */
        this.time = this.time + 1;
        const minutes = Math.trunc(this.time / 60);
        const seconds = this.time % 60;
        this.textObj.innerHTML = this.format(minutes) + ':' + this.format(seconds);
    }

    defineFuntionToCall = (functionToCall) =>
    {
        this.functionToCall = functionToCall;
    }

    manageLabelRecorder = () =>
    {
        /* This procedure is used to display information about recording to user.
            manage_label_recorder() => Null;
        */
        
        this.recorder_label = document.getElementsByClassName("field-image-m")[0];
        let imageObj = this.recorder_label.children[0];
        this.textObj = this.recorder_label.children[1];

        // Reset time 
        this.time = 0;

        // If the recorder is still recording stop it
        if(this.state_record == true)
        {
            //Stop time counter
            clearInterval(this.timeIntervalObj);
            // Unset the state of recording 
            this.state_record = false;
            // Set the color of the frame 
            this.recorder_label.style.background = "#FFFFFF";
            // Resize image object 
            imageObj.style.margin = "0.6em 0.3em 0.65em 0.7em";
            imageObj.style.width = "1.6em";
            imageObj.style.height = "1.6em";

            // Disbled the text counter 
            this.textObj.style.display = "None";
        }
        else
        {

            this.state_record = true;
            // Set the color of the frame 
            this.recorder_label.style.background = "rgb(0, 0, 0)";

            // Disbled the text counter 
            this.textObj.style.display = "block";
            
            // Resize image object 
            imageObj.style.margin = "0.3em 0.1em 0.35em 0.8em";
            imageObj.style.width = "1.4em";
            imageObj.style.height = "1.4em";

            //Compute and display time in real time
            this.timeIntervalObj = setInterval(this.timeDiplayer, 1000);
        }
        this.functionToCall(this.state_record);
    }
}


validateFormObj = new Validateform();
changeStateObj = new ChangeState(validateFormObj);
recorderObj = new RecordMicrophoneViewer();
