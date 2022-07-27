export const mixArray = (arr) => {
    const firstInd = 0
    const lastInd = arr.length


    for (let i = 0; i < lastInd; i++) {
        let firstRandom = Math.floor(Math.random() * lastInd) + firstInd
        let secondRandom = Math.floor(Math.random() * lastInd) + firstInd

        if (firstRandom == secondRandom) {
            i--
        }
        else{
            [arr[firstRandom], arr[secondRandom]] = [arr[secondRandom], arr[firstRandom]];
        }
    }

    return arr
}

// export const checkAlreadyInCart = (cart,vendorId,productId) =>{
//     if(Object.keys(cart).indexOf(vendorId) == -1 )
//     {
        
//         // let found = false;
//         // cart[vendorId].products.foreach((val,i)=>{
//         //     if(val.productId == productId)
//         //     {
//         //         found = true
//         //     }
//         // })
//         // return found
//         return true
//     }
//     else{
//         console.log(cart[vendorId],"check avalable",productId)
//         return true
//     }
// }