// import React from 'react'
// import Data from '../Components/data'
// import UserContext from './createContext'

// const provideContext = () => {
//     const [user, setUser] = useState();

//     const loadUser = async () => {
//         try {
//           const { data } = await axios.post("/api/v1/register");
//           setUser(data.user.name);
//           console.log(user)
//         } catch (e) {}
//       };


//       const register={
//         name:'Asma',
//         email:'asma@gmail.com',
//         password:'1234567'
//       }
//       useEffect(() => {
//         loadUser(register)
//       }, [])
      

//   return (
    
//     <UserContext.Provider value={user}>
//       <>
//         <Home/>
//         <Data/>
//         <InfoBar/>
//         <Chatbot/>
//         <Msg/>
//         </>
//     </UserContext.Provider>
   
//   )
// }

// export default provideContext