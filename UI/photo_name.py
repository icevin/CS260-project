import os

folder = "/Users/kimberlyshi/Desktop/CS260/UI/UI/gpt3"
for count, filename in enumerate(os.listdir(folder)):
    dst = f"Photo{str(count)}.png"
    src =f"{folder}/{filename}"  # foldername/filename, if .py file is outside folder
    dst =f"{folder}/{dst}"
     
    # rename() function will rename all the files
    os.rename(src, dst)