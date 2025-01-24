import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";

import axios from "axios";
const Payment = () => {
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:8000/api/getkey");
    const {
      data: { order },
    } = await axios.post("http://localhost:8000/api/payment/checkout", {
      amount,
    });

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "PlantWorld", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:8000/api/payment/paymentVerification",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "##121212",
      },
    };
    var razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <Box>
      <Stack
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={["column", "row"]}
      >
        <Card
          amount={5000}
          img={"/Shop Page/image3.png"}
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={3000}
          img={"/Shop Page/image3.png"}
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Payment;
