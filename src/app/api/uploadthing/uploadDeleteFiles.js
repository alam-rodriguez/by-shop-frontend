"use server";

import { UTApi, UTFile } from "uploadthing/server";
const utapi = new UTApi();

// export default utapi;

const deleteFile = async (imagesKeys) => {
    console.log("Borrando");
    const resh = await utapi.deleteFiles(imagesKeys);
    console.log({ ...resh });
    return { ...resh };
};

export default deleteFile;
