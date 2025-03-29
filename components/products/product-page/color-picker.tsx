import { colorChoices } from "@/constants/product-constants";
import { ColorType } from "@/types/cart-types";

const ColorPicker = ({
  selectedColor,
  onSelectColor,
}: {
  selectedColor: ColorType | null;
  onSelectColor: (color: ColorType) => void;
}) => (
  <section aria-labelledby="color-picker-heading">
    <h2 id="color-picker-heading" className="font-bold text-lg my-2">
      Colour:
    </h2>
    <div className="flex space-x-2" role="radiogroup" aria-label="Color options">
      {colorChoices.map((color, index) => (
        <button
          key={index}
          onClick={() => onSelectColor(color)}
          type="button"
          role="radio"
          aria-checked={selectedColor?.name === color.name}
          aria-label={color.name}
          className="group flex items-center justify-center outline-none h-11 p-1 w-11"
        >
          <span
            className={`relative w-full h-full duration-200 group-focus-visible:outline ${
              selectedColor?.name === color.name && "ring ring-black ring-2 ring-inset"
            } rounded-full`}
          >
            <span
              className="absolute inset-0.5 lg:inset-1 bg-gray-200 rounded-full"
              style={{ background: color.rgba }}
            ></span>
          </span>
        </button>
      ))}
    </div>
  </section>
);

export default ColorPicker;