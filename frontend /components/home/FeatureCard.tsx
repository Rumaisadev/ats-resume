export default function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden

      rounded-2xl

      border
      border-[var(--color-border)]

      bg-white

      p-8

      shadow-sm

      transition-all
      duration-500

      hover:-translate-y-2

      hover:border-orange-500/40

      hover:shadow-xl
      "
    >
      {/* Orange Glow */}

      <div
        className="
        absolute
        -right-12
        -top-12

        h-36
        w-36

        rounded-full

        bg-orange-500/10

        blur-3xl

        transition-all
        duration-500

        group-hover:bg-orange-500/20
        "
      />

      {/* Icon */}

      <div
        className="
        relative

        mb-6

        inline-flex

        rounded-xl

        border
        border-orange-500/20

        bg-orange-50

        p-3

        text-orange-500

        transition-all
        duration-300

        group-hover:scale-110

        group-hover:rotate-3
        "
      >
        {icon}
      </div>

      {/* Title */}

      <h3
        className="
        relative

        text-xl

        font-semibold

        text-gray-900

        transition-colors

        duration-300

        group-hover:text-orange-500
        font-heading
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
        relative

        mt-3

        leading-relaxed

        text-gray-600
        "
      >
        {text}
      </p>

      {/* Orange Bottom Line */}

      <div
        className="
        absolute

        bottom-0
        left-0

        h-1

        w-0

        bg-orange-500

        transition-all
        duration-500

        group-hover:w-full
        "
      />
    </div>
  );
}
