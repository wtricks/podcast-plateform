import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { useAlert } from '../../context/Alert'
import { auth, storage } from '../../firebase'
import { userSelector, changeUser } from '../../store/user'
import Form from '../../components/Form'
import DefaultAvatar from '../../assets/avatar.jpg'
import './style.css'

export default function EditProfile() {
    const refs = useRef();
    const show = useAlert();
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(false)
    const [c, setC] = useState(false)

    const setUser = (name, email, avatar, reset) => {
        updateProfile(auth.currentUser, {
            displayName: name,
            email,
            photoURL: avatar
        }).then(() => {
            dispatch(changeUser({ ...user, name, email, avatar }))
            reset()
            show("Profile updated successfully")
            setC(!c)
        }).catch((err) => {
            show('An error occured: ' + err.message)
        }).finally(() => setLoading(false))
    }

    const onSubmit = (data, reset) => {
        if (!data.fname) {
            show("Name is required!");
        }

        else if (!data.email) {
            show("Email address is required!");
        } else {
            setLoading(true);
            if (file) {
                const sref = ref(storage, "avatar/user-" + user.id);
                uploadBytes(sref, file)
                    .then(async () => {
                        setUser(
                            data.fname,
                            data.email,
                            await getDownloadURL(sref),
                            reset
                        )
                    })
                    .catch(err => show('An error occured: ' + err.message))
                    .finally(() => setLoading(false))
            } else {
                setUser(
                    data.fname,
                    data.email,
                    null,
                    reset
                )
            }
        }
    }

    return (
        <div className="container">
            <main>
                <h2 style={{ marginTop: '2rem' }}>Edit Profile</h2>
                <div className="profile-info">
                    <div className="profile-pic" style={{ height: 140, width: 140, marginBottom: '2rem' }}>
                        <img src={file ? URL.createObjectURL(file) : user.avatar || DefaultAvatar} alt="Anuj Kumar Profile Photo" />

                        <div className="hover-btn" onClick={() => refs.current.click()}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9445 14.1875L9.94446 10.1875M13.9445 14.1875L8.946 19.1859C8.28735 19.8446 7.48784 20.3646 6.56993 20.5229C5.64311 20.6828 4.49294 20.736 3.94444 20.1875C3.39595 19.639 3.44915 18.4888 3.609 17.562C3.76731 16.6441 4.28735 15.8446 4.946 15.1859L9.94446 10.1875M13.9445 14.1875C13.9445 14.1875 16.9444 11.1875 14.9444 9.1875C12.9444 7.1875 9.94446 10.1875 9.94446 10.1875M3.5 12C3.5 5.5 5.5 3.5 12 3.5C18.5 3.5 20.5 5.5 20.5 12C20.5 18.5 18.5 20.5 12 20.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <input accept='image/*' ref={refs} onChange={e => setFile(e.target.files?.[0])} type="file" name="profile-pic" />
                    </div>

                    <Form
                        action="/user-edit"
                        data={[
                            {
                                name: 'fname',
                                type: 'text',
                                props: { placeholder: 'Full Name' },
                                value: user.name
                            },
                            {
                                name: 'email',
                                type: 'email',
                                props: { placeholder: 'Email Address' },
                                value: user.email
                            }
                        ]}
                        loading={loading}
                        buttonText="Update"
                        onSubmit={onSubmit}
                        style={{ width: 350, maxWidth: '100%' }}
                        c={c}
                    />
                </div>
            </main>
        </div>
    )
}