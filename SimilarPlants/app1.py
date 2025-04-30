import openai
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Set up your OpenAI API key
openai.api_key = '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'  # Replace with your OpenAI API key

# Define a simple template for the prompt
prompt_template = "Translate the following English text to French: {text}"

# Create a PromptTemplate object
prompt = PromptTemplate(input_variables=["text"], template=prompt_template)

# Initialize the OpenAI model with LangChain
llm = OpenAI(temperature=0.7)

# Create an LLMChain with the prompt and model
chain = LLMChain(prompt=prompt, llm=llm)

# Use the chain to process a given input
text_to_translate = "Hello, how are you?"
translated_text = chain.run(text=text_to_translate)

# Print the translated text
print("Translated Text:", translated_text)
