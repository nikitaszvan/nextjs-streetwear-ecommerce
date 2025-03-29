import { sizeChoices } from "@/constants/product-constants";

const SizePicker = ({
  selectedSize,
  onSelectSize,
}: {
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
}) => (
  <section aria-labelledby="size-picker-heading">
    <h2 id="size-picker-heading" className="font-bold text-lg my-2">
      Sizes:
    </h2>
    <div className="flex space-x-2" role="radiogroup" aria-label="Size options">
      {sizeChoices.map((size, index) => (
        <button
          key={index}
          onClick={() => onSelectSize(size)}
          data-test-id="vf-size-picker"
          type="button"
          role="radio"
          aria-checked={selectedSize === size}
          aria-label={`Size ${size}`}
          className={`group flex items-center justify-center outline-none h-8 px-3 w-11 rounded ${
            selectedSize === size ? "text-white bg-black" : "hover:bg-gray-200 text-black bg-white"
          }`}
        >
          <span className="relative w-full h-full duration-200 group-focus-visible:outline flex justify-center items-center">
            {size}
          </span>
        </button>
      ))}
    </div>
  </section>
);

export default SizePicker;