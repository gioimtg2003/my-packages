# Nest banking

Welcome to **Nest banking**! 🚀  
A concise and powerful solution to [describe your package's purpose briefly].

## Features

- 🌟 **Feature 1**: Get history banking.

## Installation

Install the package via npm:

```bash
npm install @gioimtg2003/packages
```

Or with yarn:

```bash
yarn add @gioimtg2003/packages
```

## Documentation

For detailed documentation, visit the [official docs](#).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

# zoi-component

A small collection of React UI primitives and form helpers used across projects. The package centralizes Field components, form primitives (built on `react-hook-form`), a handful of UI components (Avatar, Button, Select, etc.), and some utility hooks and helpers.

This README explains what is included, how to install and use the package, and examples for common patterns.

---

## Contents

- `field/` — Generic Field wrapper and field implementations (Text, Select, adapters).
- `form/` — Form primitives and helpers:
  - `BaseForm` — controlled form field wrapper built on `react-hook-form`.
  - `input-form`, `select-form`, `checkbox-form`, `FormItem`, `FormList`, `ModeForm`, and components.
- `ui/` — Small presentational components (Avatar, Button, Card, Input, Select, Tooltip, Table, etc.).
- `hooks/` — Small hooks (e.g. `useDisclosure`, `useDeepCompareMemo` etc.).
- `lib/`, `utils/` — Utilities and helpers used by components.

The package main export surface is via `index.ts` which currently re-exports `field` and `form` modules.

---

## Installation

Install from npm as the scoped package:

    npm install @gioimtg2003/zoi-component

This package expects to be used within a React 19+ project and uses `react-hook-form`. It includes Tailwind-based styles for a number of components, so Tailwind in your project will make the UI match the original look-and-feel.

Peer / runtime dependencies you should have (check package.json for exact versions used here):

- `react` / `react-dom` (React 19+)
- `react-hook-form`
- `tailwindcss` (if you want the provided CSS to match)
- Optional: `antd` if you intend to use the Ant Design adapter components included

---

## Quick usage

Import components from the package:

    import { Field } from '@gioimtg2003/zoi-component';
    import { BaseForm } from '@gioimtg2003/zoi-component/form';
    import { useForm } from 'react-hook-form';

Basic example with `react-hook-form` using `BaseForm` and a `Field` (text):

    const form = useForm({ defaultValues: { firstName: '' } });

    <form onSubmit={form.handleSubmit(data => console.log(data))}>
      <BaseForm
        control={form.control}
        name="firstName"
        label="First name"
        render={(field) => (
          <Field
            {...field}
            valueType="text"
            fieldProps={{ placeholder: 'Enter name' }}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>

Notes:
- `BaseForm` expects a `control` from `react-hook-form` and a `render` function that receives the `field` object (similar to `Controller` render props).
- `Field` can be used directly in the `render` prop; it takes RHF `field` props (value, onChange, onBlur, name) and additional configuration props.

---

## Field API (overview)

`Field` is a generic wrapper that renders different field types depending on `valueType`.

Common props:
- `valueType` — `'text' | 'select' | ...'` (default `'text'`).
- `fieldProps` — props forwarded to the internal UI component (`className`, `onChange`, `value`, etc).
- `adapter` — `'shadcn' | 'antd' | 'custom'` — rendering adapter for some components.
- `emptyText` — what to show in `view` mode when value is empty.
- The component is implemented to accept `react-hook-form` controller render props (value, onChange, onBlur, etc).

Example:

    <Field
      {...field}               // from Controller / BaseForm render
      valueType="select"
      fieldProps={{ options: [{ label: 'A', value: 'a' }] }}
    />

Refer to the code in `field/Select` and `field/Text` for supported `fieldProps` for each field type.

---

## Form primitives

`BaseForm` props:

- `control: Control` — control object from `useForm()`.
- `name: string` — name of the field in the form.
- `label?: string` — label shown above the control.
- `description?: string | ReactNode` — help text under the control.
- `optional?: boolean` — marks label as optional.
- `containerClassName?: string` — wrapper class.
- `render: (field) => ReactNode` — function to render the actual input, receives `ControllerRenderProps`.

`input-form`, `select-form`, `checkbox-form` are convenience wrappers around `BaseForm` + built-in UI components.

`FormItem` and `FormList` help with layout and repeating fields respectively. `ModeForm` provides a context that toggles form modes (e.g. `edit` vs `view`) that `Field` respects.

---

## UI components

The `ui/` folder contains small primitives used across projects. Examples:

- `Button`, `Input`, `Select`, `Avatar`, `Badge`, `Card`, `Dialog`, `Popover`, `Tooltip`, `Table`, `Tabs`, etc.

These are lightweight wrappers around Radix primitives and Tailwind classes. They are exported for direct use when you want a consistent look.

---

## Styling

- Many components rely on Tailwind CSS classes and a small `style.css` shipped with the package. If your project uses Tailwind, the components will match the intended appearance.
- Some components also target Ant Design (via adapters) when `adapter="antd"` is provided; in that case ensure `antd` is installed and its CSS is loaded if you want the Ant Design visuals.

---

## Development

Project uses TypeScript. Build configuration and tsconfigs are included in the package.

Common tasks when working locally:
- Run type checks and build with your standard monorepo flow.
- Components use utility helpers from `lib` and `utils` — review those when adding new features.

---

## Contributing

If you want to contribute:
1. Open an issue describing what you want to change.
2. Create a branch, make small focused changes, add tests if applicable.
3. Send a PR with a clear description and examples.

When adding new components, keep them small, well-documented, and consistent with existing naming/props conventions.


---

If you'd like, I can:
- Expand the README with detailed prop tables for each exported component.
- Add usage examples for `select-form` and the Ant Design adapter.
- Generate a CHANGELOG or a full documentation site skeleton.

Tell me which of the above you'd prefer and I'll add it next.

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by [Nguyen Cong Gioi](#).
