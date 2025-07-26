export const Upload = async({data}:{data:File}) => {
    try {
        const formData = new FormData();
        formData.append("image", data);
        const response = await fetch(
          `https://api.imgbb.com/1/upload?&key=${"d79b4fa169f20167eb7d2b89c9e782a4"}`,
          {
            method: "POST",
            body: formData,
          }
        );
      
        const url = await response.json();
        return url.data.image.url;
    } catch (error) {
        
    }
}