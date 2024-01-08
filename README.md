# GreenFilter-AI

This project aims to validate or invalidate your proposed problem and solution in regards to sustainability. This was done by initially using OpenAI to sift through the dataset and indicate on whether or not the proposed problem-solution pair was of any relevancy towards sustainability. Next, we pruned the data further by removing odd characters, different languages, and empty entries from the dataset. Finally, we train the model using a recurrent neural network, more specifically, using LSTM from tensorflow libraries. The end result is a Web Chat Bot where the user must provide a problem and solution, and gets validated if correct.


# How To Use

You are required to utilize Google Colab. Opening the notebook will show a table of contents where there is Mandatory, Pruning, Modeling, and the Web UI. Mandatory must be ran for anything else to work.

Mandatory requires access to a specific folder. You may change the directory of said folder or use the one that is shared. The most important files are "GreenFilterModel.json" and "tokenizerGreenFilter.pickle".

If you are only interested in prompting, then going on the website will work. Otherwise, you may go straight to Web UI where all of the cell blocks must be ran (AFTER Mandatory), where it will load the aforementioned files.

# Disclaimer

OpenAI was used for the initial labeling, and used to aid us during the development of this project. 
