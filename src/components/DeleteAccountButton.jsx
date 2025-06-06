import { supabase } from '../lib/supabaseClient';
import useUserStore from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const DeleteAccountButton = () => {
    const user = useUserStore((state) => state.user)
    const navigate = useNavigate(); 
    

    const handleDelete = async () => {
        if (!user) return

        const confirmed = window.confirm('Are you sure you want to delete you account? This cannot be undone.')

        if(!confirmed) return

        const { error } = await supabase
            .from('profiles')
            // .upsert({ 
            //   id: user.id, 
            //   deleted_at: new Date().toISOString() 
            // })
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', user.id)

        if (error) {
            console.error('Error marking account for deletion', error)
            alert('Something went wrong. Try again.')
        } else {
            alert('Your account has been marked for deletion.')
            await supabase.auth.signOut()
            navigate('/')
        }
    }

    return <button onClick={handleDelete} className="rounded-full px-3 py-2 font-bold bg-red-600 hover:bg-red-700 cursor-pointer">Delete Account</button>

}

export default DeleteAccountButton
