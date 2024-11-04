import { join } from "path";
import { readFileSync } from "fs";
import Order from "../order/order.model";
import { TProduct } from "../product/product.interface";

const confirmationService = async (transactionId: string, status: string) => {
  let message = "";
  const result = await Order.findOne({ transactionId }).populate({
    path: "products.productId",
    model: "product",
    populate: {
      path: "category",
      model: "category",
    },
  });

  if (status === "success") {
    await Order.findOneAndUpdate({ transactionId }, { paymentStatus: "paid" });

    message = "Successfully Paid ✅";
  } else if (status === " failed") {
    message = "Payment Failed ❌";
  } else {
    message = "Payment Canceled ❌";
  }

  const filePath = join(__dirname, "../../../views/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  let productsTable = ``;

  result?.products?.map((product) => {
    

    const populatedProduct = product.productId as unknown as TProduct

    productsTable += `<tr>
        <td>${populatedProduct.name} ( ${populatedProduct.price} ) &nbsp; &nbsp;&nbsp; x  &nbsp;&nbsp;${product.quantity}</td>    
        <td>${populatedProduct.price * product.quantity}</td>    
    </tr>`;
  });

  template = template.replace("{{message}}", message || "");
  template = template.replace("{{trxId}}", transactionId || "");
  template = template.replace("{{productDetail}}", productsTable);
  template = template.replace("{{cost}}", `${result?.totalPrice}`);
  return template;
};

export const paymentServices = { confirmationService };
