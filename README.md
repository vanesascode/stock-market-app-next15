This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Animations (tw-animate-css)

This project includes the dependency `tw-animate-css` and imports it in `app/globals.css` via:

```css
@import "tw-animate-css";
```

What is it? `tw-animate-css` is a small utility CSS package that exposes a set of ready‑to‑use animation utility classes that work nicely alongside Tailwind CSS. You can add subtle entrance, attention, and transition effects by applying simple classes to your elements.

How to use it:
- Add an animation utility to any element, e.g. `className="animate-fade-in"` to fade in, or `className="animate-bounce"` for a bouncing effect.
- You can combine it with Tailwind utilities, e.g. `className="opacity-0 animate-fade-in duration-500"`.

Example:

```tsx
export default function Example() {
  return (
    <button className="px-4 py-2 rounded bg-primary text-primary-foreground animate-fade-in">
      Hello
    </button>
  );
}
```

Note: If you don’t see animations, ensure your global styles are loaded (they are by default via `app/layout.tsx`) and that your browser does not reduce motion. Some animations may respect `prefers-reduced-motion`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
