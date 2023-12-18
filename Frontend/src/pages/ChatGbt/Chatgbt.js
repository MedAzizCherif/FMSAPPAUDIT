import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you would to a 10 year old learning how to code."
}
function Chatgbt() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Fms's chatbot ! Ask me anything!",
      sentTime: "just now",
      sender: "FMS"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }     
      return { role: role, content: messageObject.message}
    });


    let response = "";
    if (chatMessages[chatMessages.length - 1].message.toLowerCase().includes("aziz cherif")) {
      response = "aziz cherif is one of the creator of fms";
    } else if (chatMessages[chatMessages.length - 1].message.toLowerCase().match(/eco(-|\s)?volunteer(ing|s)?/)) {
      response = "FMS is a maintenance platform created by Aziz";
    } else {
      // Get the request body set up with the model we plan to use
      // and the messages which we formatted above. We add a system message in the front to'
      // determine how we want chatGPT to act. 
      const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
          systemMessage,  // The system message DEFINES the logic of our chatGPT
          ...apiMessages // The messages from our chat with ChatGPT
        ]
      }

      await fetch("https://api.openai.com/v1/chat/completions", 
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        response = data.choices[0].message.content;
      });
    }

    setMessages([...chatMessages, {
      message: response,
      sender: "ChatGPT"
    }]);
    setIsTyping(false);
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "500px", width: "700px"  }}>
        <MainContainer>
        <ChatContainer>       
  <MessageList 
    scrollBehavior="smooth" 
    typingIndicator={isTyping ? <TypingIndicator content="FMS is typing" /> : null}
  >
    {messages.map((message, i) => {
      console.log(message)
      return <Message key={i} model={message} />
    })}
  </MessageList>
  <MessageInput placeholder="Type message here" onSend={handleSend} />        
</ChatContainer>

        </MainContainer>
      </div>
    </div>
  )
}

export default Chatgbt;
