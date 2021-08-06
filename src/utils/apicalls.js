export const submitSentence = async (sentence) => {
    const formdata = new FormData();
    formdata.append("key", "269a10b0ae7249a4022c77a093494421");
    formdata.append("txt", `${sentence}`);
    formdata.append("lang", "en");  
    // console.log(sentence)
    try {
        const response = await fetch('https://api.meaningcloud.com/sentiment-2.1', {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
         })
        return await response.json()
        // console.log(data)
    } catch (err) {
        console.log(err)
    }
}