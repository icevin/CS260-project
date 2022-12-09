# Generates n images from Prompts in filename

import argparse
import keras_cv
from tensorflow import keras
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
import math
import pickle
from PIL import Image

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("prompt_path")
    parser.add_argument("n")
    args = parser.parse_args()

    n = args.n
    path = args.prompt_path
    # Enable mixed precision to save VRAM
    keras.mixed_precision.set_global_policy("mixed_float16")

    model = keras_cv.models.StableDiffusion(jit_compile=True)
    seed = 12345
    noise = tf.random.normal((512 // 8, 512 // 8, 4), seed=seed)

    names = open(path).read().split('\n')

    start = 0

    # Only go up to closets multiple of batch_size
    batch_size = 5
    n = (n // batch_size) * batch_size
    batches = n // batch_size

    temp = []
    for idx, name in enumerate(names[start:n]):
        prompt = f"a toyota prius on a {name}"
        encoding = tf.squeeze(model.encode_text(prompt))
        temp.append(encoding)

    encodings = tf.stack(temp)

    batched_encodings = tf.split(encodings, batches)
    images = []
    curr = 0
    for batch in range(batches):
        images = [
            Image.fromarray(img)
            for img in model.generate_image(
                batched_encodings[batch],
                batch_size=batch_size,
                num_steps=25,
                diffusion_noise=noise,
            )
        ]
        for idx, im in enumerate(images):
            im.save(f"{names[curr]}.png")
            curr += 1

    # tf.io.write_file("encodings.pt", encodings)
