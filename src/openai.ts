import { Configuration, OpenAIApi } from "openai";

export const Translator = async (options: {languages: String[], text: string}) => {
    const {languages, text} = options
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const formatText = () => {
        let text = "Translate this into "
        const noLanguages = languages.length
        languages.forEach((lang, index) => {
            if(index < noLanguages){
                text = text + `${index + 1}. ${lang} `
            }else{
                text = text + `and ${index + 1}. ${lang}`
            }
        })
        
        return text + `\n\n${text}\n\n1.`
    }
    
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: formatText(),
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        
        if(response?.data?.choices?.length){
            return response?.data?.choices[0].text
        }

        return null
        
    } catch (error) {
        console.log(error);
    }
    
}

