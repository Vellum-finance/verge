type Props = {
  price: number;
};

export default function TradePanel({ price }: Props) {
  return (
    <div className="rounded-2xl bg-card ring-1 ring-hairline p-6">

      <div className="text-[10px] mono uppercase tracking-widest text-brand">
        Trade
      </div>

      <h3 className="mt-3 text-2xl font-semibold">
        Buy Token
      </h3>

      <div className="mt-6">

        <div className="text-[10px] mono uppercase tracking-widest text-muted-foreground">
          Current Price
        </div>

        <div className="mt-2 text-3xl font-semibold">
          $
          {price.toFixed(8)}
        </div>

      </div>

      <div className="mt-8">

        <div className="text-[10px] mono uppercase tracking-widest text-muted-foreground mb-2">
          ETH Amount
        </div>

        <input
          type="number"
          placeholder="0.10"
          className="
            w-full
            rounded-xl
            bg-surface-alt
            ring-1
            ring-hairline
            px-4
            py-3
            outline-none
          "
        />

      </div>

      <button
        className="
          mt-8
          w-full
          rounded-xl
          bg-brand
          text-black
          py-3
          font-semibold
          hover:opacity-90
        "
      >
        Buy
      </button>

    </div>
  );
}