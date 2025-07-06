import React ,{ useState } from "react";

import FormInput  from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

   

import { 
    signInWithGooglePopup ,
    signInWithGoogleRedirect,
    signInAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
const defaultFormFields = {   
    email: "",
    password: "",                                   
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState({ email: '', password: '' });
    const {email, password} = formFields;

    //console.log(formFields);
    //const{ setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
        } catch (error) {
            if (error.code === 'auth/popup-blocked') {
                console.log('Popup blocked, falling back to redirect...');
                await signInWithGoogleRedirect();
            } else {
                console.error('Error during Google sign-in:', error);
            }
        }
    };  
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!email || !password) {
            alert('Please fill in both email and password fields.');
            return;
        }
    
        //console.log('Attempting to sign in with:', { email, password });
    
        try {
            const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
            const { user } = userCredential;
            console.log('User signed in:', user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email.');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email.');
                    break;
                default:
                    console.log('Error during sign-in:', error);
                    break;
            }
        }
    };

    const handleChange = (event) => {
       const {name,value} = event.target;

         setFormFields({...formFields,[name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div className="buttons-container">

                    <Button type="submit">Sign In</Button>
                    <Button 
                       buttonType={BUTTON_TYPE_CLASSES.google} 
                       type='button' 
                       onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;