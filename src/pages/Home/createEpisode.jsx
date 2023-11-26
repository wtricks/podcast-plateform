import { useParams } from 'react-router-dom'
import Form from '../../components/Form'
import "./style.css"

export default function CreateEpisode() {
    const { id } = useParams();

    const onSubmit = (data, form) => {
        console.log(data, form)
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
                />
            </main>
        </div>
    )
}