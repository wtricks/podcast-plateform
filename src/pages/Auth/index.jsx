import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../firebase'
import { useAlert } from '../../context/Alert'
import Form from '../../components/Form'
import './style.css'

const SIGN_UP_PAGE = [
    {
        name: 'fname',
        type: 'text',
        props: { placeholder: 'Full Name' }
    },
    {
        name: 'email',
        type: 'email',
        props: { placeholder: 'Email Address' }
    },
    {
        name: 'pass',
        type: 'password',
        props: { placeholder: 'Password' }
    },
    {
        name: 'cpass',
        type: 'password',
        props: { placeholder: 'Confirm Password' }
    }
]
const SIGN_IN_PAGE = SIGN_UP_PAGE.filter((_, i) => i != 0 && i != 3)

export default function SignUp() {
    const [loading, setLoading] = useState(false);

    const show = useAlert();
    const { type } = useParams()
    // const navigate = useNavigate()
    const isSignupPage = type == 'signup'

    const formSubmitForSignInPage = (data, reset) => {
        if (!data.email) {
            show('Email is required!');
        }

        else if (!data.pass) {
            show('Password is required!');
        }
        else {
            setLoading(true)
            signInWithEmailAndPassword(auth, data.email, data.pass)
                .then(() => {
                    reset();
                    show("Logged in successfully.", 5000)
                }).catch(err => {
                    if (err.code == 'auth/invalid-login-credentials') {
                        show('Invalid email address or password.');
                    } else {
                        show('An error occured: ' + err.message)
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const formSubmitForSignUpPage = (data, reset) => {
        if (!data.fname) {
            show('Name is required!');
        }

        else if (!data.email) {
            show('Email is required!');
        }

        else if (!data.pass) {
            show('Password is required!');
        }

        else if (data.cpass !== data.pass) {
            show('Confirm Password does\'t matched!');
        }

        else if (data.pass.length < 6) {
            show('Weak password, Password length should be greater than 5.');
        }

        else {
            setLoading(true)
            createUserWithEmailAndPassword(auth, data.email, data.pass, data.fname)
                .then(() => {
                    show("Account is created and logged in successfully.", 5000)
                    reset();
                })
                .catch(err => {
                    if (err.code == 'auth/email-already-in-use') {
                        show('Email address is already taken, Try another email address.');
                    } else {
                        show('An error occured: ' + err.message)
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <div className='container'>
            <main>
                <h2>{isSignupPage ? "Create new Account" : 'Welcome back'}</h2>
                <p>{isSignupPage ? "Join us to view and share amazing podcasts" : 'Login to continue'}</p>

                <Form
                    data={isSignupPage ? SIGN_UP_PAGE : SIGN_IN_PAGE}
                    buttonText={isSignupPage ? "Sign up" : "Sign In"}
                    onSubmit={isSignupPage ? formSubmitForSignUpPage : formSubmitForSignInPage}
                    action={"/auth?action=" + (isSignupPage ? 'signup' : 'signin')}
                    loading={loading}
                />
                {isSignupPage
                    ? <p className='tagline'>Already have an account? <Link to="/auth/signin">Sign in</Link></p>
                    : <p className='tagline'>Don&apos;t have an account? <Link to="/auth/signup">Sign up</Link></p>
                }
            </main>
        </div>
    )
}