import os

if __name__ == "__main__":
    with open("lookup.js", "w") as f:
        header = "const prompt = {\n"
        f.write(header)
        
        count = 1
        for filename in os.listdir():
            if filename[-4:] != ".png":
                continue
            rename = f"{count}.png"
            line = f"{count}: \"{filename[:-4]}\",\n"
            f.write(line)
            os.rename(filename, rename)
            count += 1

        footer = "}\nexport { prompt };\n"
        f.write(footer)