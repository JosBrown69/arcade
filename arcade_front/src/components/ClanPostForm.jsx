import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {createPosts} from '../api/api'

export function ClanPostForm({ clan, user }) {
    const params = useParams()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async(data) => {
        try {
            const id = params.id
            const res = await createPosts(id, data)
            console.log(res);
        } catch(errors) {
            console.error(errors)
        }
    })

    console.log('this is clan', clan);
    console.log('this is user', user);
    console.log('this is params', params);


    return (
        <div>
            <form onSubmit={onSubmit}>
                <textarea
                    type='text'
                    id='content'
                    name='content'
                    placeholder='Writte something... ;*'
                    {...register('content', { required: true })}
                />
                {errors.content && <span>Must writte somthing</span>}
                <button>Post</button>
                </form>
        </div>
    ); 
}
