# Code structure rules and guides

## Project structure

High level project structure.

### libs

this folder is supposed to store files without any relation to project
Rules of libs.

1. They should not include code specific to project
2. They should not rely on project specific code, constants, router, etc. Code in lib should rely on external configuration
3. Code in libs should be well documented and have code coverage 80+
4. Other modules should not use libs internals without critical need.
5. Libs should have as less as possible external dependencies
   for instance it's ok to have emotion/lodash/moment/d3 as dependency but it's better to skip some specific libraries like recharts or react-router, it's better to locate such code in modules.
   In general, if u can make some functionality to work without dependency or accept it as props, just do it.
   If u feel that it's crucial to have something as dependency, then use it.
6. Libs can have any folder structure but for big features it's better to follow atomic folder structure or split feature.
   Do not put code in libs if it's very small or very specific to some functionality.

In general libs is a second node_modules folder but with your code or some forked code from other projects.
Libs folder is a good place for code like custom visualizations, ui components like slider, checkbox, table. Take in mind that such components should have configurable styling properties.
guides for designing your components api https://material-ui.com/guides/api/

in summary u can put code if libs if

- this code doesn't have relation to other modules and other project code except libs folder
- this code can be reused across all project without relation to any feature
- this code implements atomic functionality and this functionality can be configured using arguments, props, etc.
- this code has readme and covered with tests

Recommendations:

- Do not try to built the smallest atomic library which can be reused everywhere. This code still specific enough to your project and it's responsible for some functionality of it, so this component should be useable with minimum configuration but it shouldn't be specific to any of our domains.
- Try to group your functionality. For instance u've built bunch of fancy controls like checkboxes, sliders, number inputs, etc. It will be better to group them together as "form-controls" instead of treating them as separate instances. Another example is charts, you have a lot of neat charts, like barcharts, pies, ars, plots probably all of them are sharing d3 as dependency and built on the same principles, so it's better to group them together either.

### modules (aka features)

Modules are domain specific pieces of code. Module can contain everything and have any code structure but there are some simple rules and recommendations for them.

1. Modules should be self-containing and describe some big enough part of application functionality.
   for instance you have new feature with alerts of different types. This features includes: Component for other pages with some indication of status and popup with short list of triggered alerts, Table of triggered alerts,Pages for alerts management. This is good candidate for new module. In result we will have Components implemented under alerts module and other modules rely on this module.

2. Modules should not rely on internals of other modules. Module should provide simple api for usage in other modules, e.g. our Alerts module will expose Page with alerts list, components for short list and indication and that's it.
3. You can have any folder structure within module but prefer flat structure and if this module is quite big use atomic folder structure (see later)

Atomic structure within modules:
Each module can have the following structure

```
atoms
molecules
organisms
pages
templates
```

`atoms` - is the minimal building element in your module, it should be reuseable and configurable ONLY with props
`molecules` - composed atoms they can be big enough like popovers or small like buttons with loading.
because this atomic structure is specific to your domain, molecules can define some specific styles and have some hardcoded behavior but still the are intended to be reuseable
`organisms` - reuseable components with some functionality, they can have predefined behavior but they should be embedable in any part of the page.
`pages` - pages components which are not intended to be reuseable, they just compose organisms, molecules, atoms and templates.
`templates` - in case u have a lot of separate pages u can move out layout functionality to template otherwise this entity is not very useable within domain

also there are some additional entities, it highly depends on what you are doing

```
state - description of your domain model state
effects - async operations within your modules
selectors - derived data from your state
services - usually you can put here some utilities or some data transformation
api - method for backend api calls, I prefer to have them at top lvl but feel free to keep them at module lvl
types - type definitions if you have a lot of the across the module
```

### Ui

User interface specific components. This is project internal ui kit.

- All components intended to be reusable.
- All components do not rely on state and do not have dependencies on any of modules
- Components can have code specific to project in case this is code related to styles

The difference between components in lib folder and in ui folder that components in ui folder can define branding styles and use global theme constants unlike components in lib.

guides about atomic structure for ui kit:
http://bradfrost.com/blog/post/atomic-web-design/
https://codeburst.io/atomic-design-with-react-e7aea8152957

### Folder structure summary

in result we could get some structure like this

```
api
types
modules
\
 |- auth
  \
   |- atoms
   |- molecules
   |- organisms
   |- pages
   |- services
   |- state
   |- selectors
 |- users
 |- todos
 |- dashboard
libs
\
 |- charts
 |- table
 |- validation
 |- file-upload
 |- calendar
 |- pagination
ui
\
 |- atoms
 |- molecules
 |- organisms
 |- pages
 |- templates
 |- theme
// rest of the files for some setup
App
index
setup
```

### Testing

For testing I have some strict requirements. But I have few recommendations.

General recommendation for testing is:
Always think how your component will be used and test edge cases without diving into component internals.

It makes sense for modules. Because every module self containing it describes limited set of features which is better to test feature using its api and its output. But it's not always possible so sometimes we have to split feature into some subsets on functionality and test them. Usually it's better to test feature functionality using organisms and pages and do not rely on smaller components behavior.

Try to not rely on specific components and controls in your tests and use 'data-testid' for that. You can set data-testid to some button and then during refactoring you will be free to move that button without breaking tests.

You tests should fail only if functionality changed but not when you change prop name or replace one component for button with another.
Test component functionality but not component implementation.

For libs it's much harder to follow that rule. First of all because you need to test more edge cases and secondly because you need higher code coverage. For libs it makes sense to split functionality in more smaller pieces and test it in isolation. Of course it's in addition to full component api testing.
