import { byteArray, cairo, CallData, Contract, RpcProvider } from "starknet";
import { abi } from "./abi";
import { sendFnType } from "@/type/type";
import app from "@/firebase/config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

async function uploadImage(image: string | FileList | File) {
  let data: FileList | File | null = null;
  if (typeof image === 'string') {
    console.log("image is a string, not a file");
    return;
  } else if (image instanceof FileList) {
    data = image;
  } else if (image instanceof File) {
    data = image;
  }
  console.log(data);
  // if image is empty
  if (!data) {
    console.log("no image"); // no image
    return;
  }
  const storage = getStorage(app);

  // Create the file metadata
  const metadata = {
    contentType: "image/jpeg",
  };
  const date = new Date().getMilliseconds();
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, `poolImage/${data instanceof FileList ? data[0]?.name : data.name}-${date}`);
  console.log("uploading 2");
  // upload image to firebase storage
  if (data instanceof FileList && data.length < 0) return;
  const snapshot = await uploadBytesResumable(storageRef, data instanceof FileList ? data[0] : data, metadata);
  const imgUrl = await getDownloadURL(snapshot.ref);
  return imgUrl;
}

export const predifiContractAddress =
  "0x02bf0d976b91483635b7ad6d2097a2b09df29a4515f0deda5f1c23e460b881a0";

export const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });

export const prediFiContract = new Contract(abi, predifiContractAddress, provider);

export async function sendFn(data:sendFnType) {
    const poolImageUrl = await uploadImage(data.image);

    console.log(poolImageUrl)
    const {account,endDate,lockDate,poolCategory,poolCreatorFee,poolDetail,poolMax,poolMin,poolName,poolOptionA,poolOptionB,poolType,poolUrl,startDate} = data
  if (account) {
    const poolCall = prediFiContract.populate(
      "create_pool",
      CallData.compile([
        poolName,
        poolType,
        byteArray.byteArrayFromString(poolDetail),
        byteArray.byteArrayFromString(poolImageUrl??""),
        byteArray.byteArrayFromString(poolUrl),
        startDate,
        lockDate,
        endDate,
        poolOptionA,
        poolOptionB,
        cairo.uint256(poolMin),
        cairo.uint256(poolMax),
        poolCreatorFee,
        0,
        poolCategory,
      ])
    );
    console.log(poolCall.calldata);
    const response = await prediFiContract?.["create_pool"](poolCall.calldata);
    console.log(response);
    await provider.waitForTransaction(response?.transaction_hash);
  }
}
