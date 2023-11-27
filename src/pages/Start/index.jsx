import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

import { auth, db, storage } from '../../firebase'
import { useAlert } from '../../context/Alert'
import Form from '../../components/Form'
import './style.css'

const FORM_DATA = [
    {
        name: 'title',
        type: 'text',
        props: { placeholder: 'Title' }
    },
    {
        name: 'description',
        type: 'textarea',
        props: { placeholder: 'Description' }
    },
    {
        name: 'bannerImage',
        type: 'file',
        props: { title: 'Select Banner Image', style: { maxHeight: 90 } }
    },
    {
        name: 'smallImage',
        type: 'file',
        props: { title: 'Select Small Image' }
    }
]

export default function SignUp() {
    const show = useAlert();
    const [loading, setLoading] = useState(false)
    const onSubmitEvent = async (data, reset) => {
        if (!data.title) {
            show('Podcast title is required!')
        }
        else if (!data.description) {
            show('Podcast description is required!')
        }
        else if (!data.bannerImage) {
            show('Podcast banner image is required!')
        }
        else if (!data.smallImage) {
            show('Podcast small image is required!')
        }
        else {
            setLoading(true);
            try {
                // banner image
                const bannerImageRef = ref(storage, `podcast/podcast-${Date.now()}`);
                await uploadBytes(bannerImageRef, data.bannerImage)
                const bannerImageUrl = await getDownloadURL(bannerImageRef);

                // Small image
                const smallImageRef = ref(storage, `podcast/podcast-${Date.now()}`);
                await uploadBytes(smallImageRef, data.smallImage)
                const smallImageUrl = await getDownloadURL(smallImageRef);

                await addDoc(collection(db, 'podcasts'), {
                    title: data.title,
                    description: data.description,
                    bannerImage: bannerImageUrl,
                    smallImage: smallImageUrl,
                    createdBy: auth.currentUser.uid,
                    createAt: new Date()
                })

                show("Podcast is created successfully")
                setLoading(false);
                reset();
            } catch (error) {
                setLoading(false);
                show('An error occured: ' + error.message)
            }
        }
    }

    return (
        <div className='container'>
            <main>
                <h2>Create a new Podcast</h2>
                <p>Fill required information to create a new podcast</p>

                <Form
                    data={FORM_DATA}
                    buttonText="Create Now"
                    onSubmit={onSubmitEvent}
                    action="/create"
                    loading={loading}
                />
            </main>
        </div>
    )
}