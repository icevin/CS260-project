import keras_cv
from tensorflow import keras
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
import math
from PIL import Image
from itertools import combinations

def export_as_gif(filename, images):
    images += images[2:-1][::-1]
    images[0].save(
        filename,
        save_all=True,
        append_images=images[1:],
        duration=1000 // 8,
        loop=0,
    )

if __name__ == '__main__':
    keras.mixed_precision.set_global_policy("mixed_float16")
    model = keras_cv.models.StableDiffusion(jit_compile=True)
    seed = 12345
    noise = tf.random.normal((512 // 8, 512 // 8, 4), seed=seed)

    names = open("gpt3pairs.txt").read().split('\n')

    count = 0
    for a, b in combinations(names, 2):
        count += 1
        if count < 8:
            print(f"Skipping {count + 1}: {a} and {b}")
            continue

        print(f"Generating {count}: {a} and {b}")
        prompt_a = f"a toyota prius in {a}"
        prompt_b = f"a toyota prius in {b}"
        encoding_1 = tf.squeeze(model.encode_text(prompt_a))
        encoding_2 = tf.squeeze(model.encode_text(prompt_b))

        interpolation_steps = 10
        batch_size = 5
        batches = interpolation_steps // batch_size

        interpolated_encodings = tf.linspace(encoding_1, encoding_2, interpolation_steps)
        batched_encodings = tf.split(interpolated_encodings, batches)

        images = []
        for batch in range(batches):
            images += [
                Image.fromarray(img)
                for img in model.generate_image(
                    batched_encodings[batch],
                    batch_size=batch_size,
                    num_steps=25,
                    diffusion_noise=noise,
                )
            ]

        export_as_gif(f"gifs/{count}_{a[2:15]}_{b[2:15]}.gif", images)
