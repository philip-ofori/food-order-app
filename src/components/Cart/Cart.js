import React, { useEffect, useContext } from "react";
import classes from "./Cart.module.css";
import CartItemsContext from "../../store/cart-items";
import CartItem from "./CartItem/CartItem";
import Wrapper from "../UI/Wrapper";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
const Cart = (props) => {
  const ctxCart = useContext(CartItemsContext);
  // const [cartList, setCartList] = useState([...ctxCart.items]);
  // const [totalPrice, setTotalPrice] = useState(ctxCart.totalAmount);
  const closeCartModal = (e) => {
    console.log("Close modal");
    props.hideModal();
  };
  const orderCartItems = (e) => {
    console.log("Ordering items");
  };

  useEffect(() => {
    console.log("Calculating total price");
    console.log("Executing useEffect");
  }, [ctxCart.items]);

  const changeItemAmount = (item) => {
    console.log("Executing changeItemAmount : ", item);
    ctxCart.addItem(item);
    // setCartList((prevList) => {
    //   if (prevList.length > 0) {
    //     console.log("Previous List : ", prevList);
    //     prevList.forEach((cartItem) => {
    //       console.log("Cart : ", cartItem);
    //       if (cartItem.name.trim() === item.name.trim()) {
    //         cartItem.amount = item?.amount;
    //       }
    //     });
    //   }
    //   return [...prevList];
    // });
  };

  return (
    <Wrapper>
      <Modal onCloseCartModal={closeCartModal}>
        {ctxCart.items.length > 0 && (
          <Wrapper>
            <ul className={classes.list}>
              {ctxCart.items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onChangeAmount={changeItemAmount}
                  />
                );
              })}
            </ul>
            <div className={classes.row + " " + classes.total}>
              <h3>Total Amount</h3>
              <h3>${Number(ctxCart.totalAmount).toFixed(2)}</h3>
            </div>
          </Wrapper>
        )}
        {ctxCart.items.length === 0 && (
          <Wrapper>
            <div className={classes["empty-cart"]}>
              <h2>Cart is Empty!</h2>
            </div>
          </Wrapper>
        )}
        <div className={classes.actions}>
          <Button
            className={classes["button--alt"]}
            type="button"
            title="Close"
            text="Close"
            onClick={closeCartModal}
          />
          {ctxCart.items.length > 0 && (
            <Button
              className={classes.button}
              type="button"
              title="Order"
              text="Order"
              onClick={orderCartItems}
            />
          )}
        </div>
      </Modal>
    </Wrapper>
  );
};

export default Cart;
