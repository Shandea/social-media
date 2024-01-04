import './FriendsOutlet.css'



const FriendsOutlet = () => {
  return (
    <div className='friendscomponentcontainer'>
        <h2>Friends OUTLET</h2>
    </div>
  )
}

export default FriendsOutlet




// const Item = (props) => {
//     return (
//       <div className='item'>
//         <img src={props.image} alt="" />
//         <p>{props.name}</p>
//         <div className="item-prices" >
//           <div className="item-price-now">
//               {props.new_price}
//           </div>
//           <div className="item-price-old">
//             {props.old_price}
//           </div>
//         </div>
//       </div>
//     )
//   }
  
//   export default Item




// import data_product from '../assets/Data'
// import Item from '../items/Item'
// const Popular = () => {
//     return (
//         <div className='popular'>
//             <h1>POPULAR IN WOMEN</h1>
//             <hr />
//             <div className='popular-item'>
//                 {
//                     data_product.map((item, i) => {
//                         return (

//                             <Item
//                                 key={i}
//                                 id={item.id}
//                                 name={item.name}
//                                 image={item.image}
//                                 new_price={` $ ${item.new_price}`}
//                                 old_price={`$ ${item.old_price}`}
//                             />
//                         )
//                     })
//                 }

//             </div>
//         </div>
//     )
//             }
// export const Popular