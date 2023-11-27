import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

import { db, storage } from '../../firebase'
import { useAlert } from '../../context/Alert'
import Form from '../../components/Form'
import "./style.css"

export default function CreateEpisode() {
    const [loading, setLoading] = useState(false)
    const show = useAlert();
    const { id } = useParams();

    const onSubmit = async (data, reset) => {
        if (!data.title) {
            show("Episode Title is required!")
        } else if (!data.description) {
            show("Episode description is required!")
        } else if (!data.audio) {
            show("Please select a audio for podcast.")
        } else {
            setLoading(true);
            try {
                // audio uploading
                const audioRef = ref(storage, `podcast/podcast-${Date.now()}`);
                await uploadBytes(audioRef, data.audio)
                const AudioUrl = await getDownloadURL(audioRef);

                await addDoc(collection(db, 'podcasts', id, 'episodes'), {
                    title: data.title,
                    description: data.description,
                    audio: AudioUrl,
                    createAt: new Date()
                })

                show("Episode is created successfully")
                setLoading(false);
                reset();
            } catch (error) {
                setLoading(false);
                show('An error occured: ' + error.message)
            }
        }
    }

    return (
        <div className="container">
            <main>
                <h2>Create new Episode</h2>
                <Form
                    data={[
                        {
                            name: 'title',
                            props: { placeholder: 'Title' },
                            type: 'text'
                        },
                        {
                            name: 'description',
                            props: { placeholder: 'Description' },
                            type: 'textarea'
                        },
                        {
                            name: 'audio',
                            props: {
                                title: 'Select Audio',
                                accept: 'audio/*',
                            },
                            type: 'file'
                        }
                    ]}
                    action={"/podcast/" + id + "/create"}
                    buttonText="Create"
                    onSubmit={onSubmit}
                    loading={loading}
                />
            </main>
        </div>
    )
}