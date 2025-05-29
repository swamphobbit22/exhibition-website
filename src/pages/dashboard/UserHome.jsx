import  useUserStore  from '../../store/useUserStore'

const UserHome = () => {
const { user, isAuthenticated} = useUserStore()
  return (
    <div>
      <div className='pt-28 flex flex-col justify-center items-center'>
      <h2 className='text-3xl'>Hello {user?.email}</h2>
      <h3 className='text-2xl'>Welcome to your dashboard</h3>
      <p>Here you can manage your account, create and view your collections and change your settings</p>
    </div>
    </div>
  )
}

export default UserHome
