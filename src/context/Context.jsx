import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response="";
        if (prompt !== undefined) {
            // await runChat(prompt, setLoading, setResultData);
            const url = "http://192.168.1.37:8080/api/" + prompt;
            const eventSource = new EventSource(url);

            eventSource.onmessage = (event) => {
                console.log("Event Source Message: ", typeof (event.data));
                response = response +  " " +event.data;
                setResultData(response);
                
                setLoading(false)
                setInput("")
                setRecentPrompt(prompt);
            }

            eventSource.onerror = (error) => {
                console.error("Event Source Failed: ", error);
                eventSource.close();
            }

        }
        else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input)
            // await runChat(input, setLoading, setResultData);
            const url = "http://192.168.1.37:8080/api/" + input;
            const eventSource = new EventSource(url);

            eventSource.onmessage = (event) => {
                console.log("Event Source Message: ", typeof (event.data));
                response = response +  " " +event.data;
                setResultData(response);
                // let responseArray = response.split("**");
                // let newResponse = "";
                // for (let i = 0; i < responseArray.length; i++) {
                //     if (i === 0 || i % 2 !== 1) {
                //         newResponse += responseArray[i];
                //     }
                //     else {
                //         newResponse += "<b>" + responseArray[i] + "</b>";
                //     }
                // }
                // let newResponse2 = newResponse.split("*").join("</br>")
                // let newResponseArray = newResponse2.split("");
                // for (let i = 0; i < newResponseArray.length; i++) {
                //     const nextWord = newResponseArray[i];
                //     delayPara(i, nextWord + "")
                // }
                setLoading(false)
                setInput("")
            }

            eventSource.onerror = (error) => {
                console.error("Event Source Failed: ", error);
                eventSource.close();
            }


        }



    }


    const ContextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider