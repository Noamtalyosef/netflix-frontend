import React, { useContext, useEffect, useReducer, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Featured from '../../components/Featured/Featured'
import { AuthContext } from '../../auth/authContext'
import { useNavigate } from 'react-router-dom'
import { reducerHomePage, initialHomePageReducer } from '../../reducerHomePAge'
import axios from 'axios'
import Loaging from '../../components/Loading/Loaging'
import Error from '../../components/Error/Error'

import ListItem from '../../components/ListItem/ListItem'
//import ListItem from '../../components/ListItem'
import '../../components/ListItem/ListItem.scss'
import { linkClasses } from '@mui/material'
import Carousel from 'react-multi-carousel'
import List from '../../components/List/List'
import "./MyListPage.scss"

const responsive = {
    superLargeDesktop5: {
      breakpoint: { max: 4000, min: 2100 },
      items: 8
    },
    superLargeDesktop4: {
      breakpoint: { max: 2100, min: 1875 },
      items: 7
    },
    superLargeDesktop3: {
      breakpoint: { max: 1875, min: 1650 },
      items: 6
    },
    superLargeDesktop2: {
      breakpoint: { max: 1650, min: 1425 },
      items: 5
    },
    superLargeDesktop: {
      breakpoint: { max: 1425, min: 1200 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 900, min: 676 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 676, min: 0 },
      items: 1
    }
  }




function MyListPage()
{




    
    const [likedItems ,setLikedItems] = useState()
    const [{ loading, error, lists }, dispatch] = useReducer(
        reducerHomePage,
        initialHomePageReducer
      ) 
      
      
    useEffect(()=>{
        async function getLIkedList() {
            dispatch({ type: 'GET_REQUEST' })
            try{
                const user = localStorage.getItem("user")
                const parsdeUser = JSON.parse(user);
                const result = await axios.get(`usersInfo?_userId=${parsdeUser._id}`)
                setLikedItems(result.data) 
                console.log(likedItems)
               

               
               
               dispatch({ type: 'GET_SUCCESS'})
               
                  console.log(likedItems)
              
            }
            catch(err){
               console.log(err)
            }
           
            
        }
        getLIkedList();
        
        
    },[])

   



    return (
        <div className='MyList' > 
        <Navbar></Navbar>
        {loading ?(
           <Loaging></Loaging>
        ): error ?(
            <Error></Error>
        ) : likedItems.length >0 ? (
            
            <div className='list' >
                <h2>my list</h2>
            <Carousel
        className='carousel'
        responsive={responsive}
        infinite={true}
        centerMode={true}
        swipeable={false}
        draggable={false}
      >
        {likedItems.map((item, i) => (
        
         <ListItem item={item} key={i}></ListItem>

        ))}
            </Carousel>
              
    </div>
      
       
        ): (

            <h1>nothig</h1>
        )}
        
        </div>
        
        )
}
export default MyListPage