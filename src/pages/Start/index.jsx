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
    const onSubmitEvent = (formData, form) => {
        console.log(form, formData)
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
                />
            </main>
        </div>
    )
}