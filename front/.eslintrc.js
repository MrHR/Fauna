module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "env": {
    "browser": true,
    "es6": true
  },
  "globals": {
    "$": true,
  },
  "plugins": [ "import", "react" ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "arrowFunctions": true,
      "binaryLiterals": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "generators": true,
      "globalReturn": true,
      "jsx": true,
      "modules": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": true,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "octalLiterals": true,
      "regexUFlag": true,
      "regexYFlag": true,
      "spread": true,
      "superInFunctions": true,
      "templateStrings": true,
      "unicodeCodePointEscapes": true
    }
  },
  "rules": {
    // For more details see: http://eslint.org/docs/rules/

    // Overrides of settings in eslint:recommended: ------------------------------------------------
    //
    "no-console": 0,            // disallow use of console
    "no-unreachable": 1,        // disallow unreachable code after return, throw, continue, and break statements

    // Possible Errors not set in eslint:recommended: ----------------------------------------------
    //
    "valid-jsdoc": 0,           // Ensure JSDoc comments are valid

    // Best Practices not set in eslint:recommended: -----------------------------------------------
    //
    "array-callback-return": 1, // Enforces return statements in callbacks of array’s methods.
    "consistent-return": 2,     // Require return statements to either always or never specify values.
    "curly": 2,                 // specify curly brace conventions for all control statements
    "default-case": 1,          // require default case in switch statements
    "dot-location": [2, "property"], // encourages use of dot notation whenever possible
    "dot-notation": 1,          // encourages use of dot notation whenever possible
    "eqeqeq": 2,                // require the use of === and !==
    "guard-for-in": 2,          // make sure for-in loops have an if statement
    "no-alert": 1,              // disallow the use of alert, confirm, and prompt
    "no-caller": 2,             // disallow use of arguments.caller or arguments.callee
    "no-div-regex": 2,          // disallow division operators explicitly at beginning of regular expression
    "no-eq-null": 2,            // disallow comparisons to null without a type-checking operator
    "no-eval": 1,               // discourage use of eval()
    "no-extend-native": 2,      // disallow adding to native types
    "no-extra-bind": 1,         // disallow unnecessary function binding
    "no-extra-label": 1,        // disallow unnecessary labels
    "no-fallthrough": 1,        // discourage fallthrough of case statements
    "no-implicit-coercion": 1,  // discourage the type conversion with shorter notations
    "no-implied-eval": 1,       // disallow use of eval()-like methods
    "no-iterator": 2,           // disallow usage of __iterator__ property
    "no-implicit-globals": 1,   // discourage var and named functions in Global Scope
    "no-invalid-this": 2,       // disallow this keywords outside of classes or class-like objects
    "no-labels": 1,             // discourage use of labels
    "no-loop-func": 2,          // disallow creation of functions within loops
    "no-multi-spaces": 0,       // disallow use of multiple spaces                                  (fixable)
    "no-multi-str": 2,          // disallow multiline string
    "no-native-reassign": 2,    // disallow reassignments of native objects
    "no-new": 1,                // disallow new operator outside of the assignment or comparison
    "no-new-func": 1,           // disallow use of new operator for Function object
    "no-new-wrappers": 1,       // disallows creating new instances of String,Number, and Boolean
    "no-octal-escape": 2,       // disallow use of octal escape sequences in string literals
    "no-param-reassign": 0,     // disallow reassignment of function parameters
    "no-process-env": 1,        // disallow use of process.env
    "no-proto": 2 ,             // disallow usage of __proto__ property
    "no-return-assign": 2,      // disallow use of assignment in return statement
    "no-script-url": 2,         // disallow use of javascript: urls.
    "no-self-compare": 2,       // disallow comparisons where both sides are exactly the same
    "no-sequences": 2,          // disallow use of comma operator
    "no-throw-literal": 2,      // restrict what can be thrown as an exception
    "no-unused-expressions": 2, // disallow usage of expressions in statement position
    "no-useless-call": 2,       // disallow unnecessary .call() and .apply()
    "no-useless-concat": 2,     // disallow unnecessary concatenation of strings
    "no-void": 2,               // disallow use of void operator

    // draw attention to dev terms in comments
    "no-warning-comments": [0, {"terms": ["todo", "fixme"], "location": "start"}],

    "radix": 2,                 // require use of the second argument for parseInt()
    "wrap-iife": [2, "inside"], // require immediate function invocation to be wrapped in parentheses
    "yoda": 1,                  // discourage Yoda conditions

    // Strict Mode ---------------------------------------------------------------------------------
    //
    "strict": 0,                // controls location of Use Strict Directives. 0: required by `babel-eslint`

    // Variables -----------------------------------------------------------------------------------
    //
    "no-catch-shadow": 2,       // disallow the catch clause parameter name being the same as a variable in the outer scope
    "no-label-var": 2,          // disallow labels that share a name with a variable
    "no-shadow": 2,             // disallow declaration of variables already declared in the outer scope
    "no-shadow-restricted-names": 1, // disallow shadowing of names such as arguments
    "no-undef": 2,              // disallow use of undeclared variables unless mentioned in a /*global */ block
    "no-undef-init": 1,         // disallow use of undefined when initializing variables
    "no-undefined": 0,          // disallow use of undefined variable
    "no-unused-vars": 1,        // disallow declaration of variables that are not used in the code
    "no-use-before-define": 0,  // disallow use of variables before they are defined

    // Stylistic Issues ----------------------------------------------------------------------------
    //
    "array-bracket-spacing": [1, "never"],  // discourage spaces inside array brackets              (fixable)
    "block-spacing": [1, "always"],         // encourage spaces inside of single line blocks        (fixable)

    // encourage Stroustrup brace style
    "brace-style": [1, "stroustrup", { "allowSingleLine": true }],

    "camelcase": 1,             // encourage camel case names

    // enforce spacing around comma                                                                 (fixable)
    "comma-spacing": [2, {"before": false, "after": true}],

    "comma-style": [2, "last"],       // enforce one true comma style (off by default)
    "computed-property-spacing": 2,   // require padding inside computed properties           (fixable)
    "consistent-this": [1, "_this"],  // encourage consistent naming when capturing the current execution context
    "eol-last": 2,                    // enforce newline at the end of file, yet no multiple empty lines  (fixable)
    "func-names": 0,                  // encourage function expressions to have a name

    // encourage use of function expressions
    "func-style": [0, "expression", { "allowArrowFunctions": true }],

    // disallow use of specific identifier
    "id-blacklist": [0, "data", "err", "e", "cb", "callback"],

    // enforces min/max identifier lengths
    "id-length": [0, {"min": 3, "max": 10, "properties": "never", "exceptions": ["x"]}],

    // require identifiers to match the provided regular expression
    "id-match": [0, "^[a-z]+([A-Z][a-z]+)*$", {"properties": false}],

    // this option sets a specific tab width for your code                                          (fixable)
    "indent": [1, 2, {
      "SwitchCase": 1,
      "VariableDeclarator": {"var": 2, "let": 2, "const": 3}
    }],

    "jsx-quotes": [1, "prefer-double"], // encourage double quotes for JSX attributes               (fixable)

    // encourage spacing convention in object literal properties
    "key-spacing": [1, {"beforeColon": false, "afterColon": true}],

    "keyword-spacing": 2,       // enforce spacing conventions around keywords                      (fixable)
    "linebreak-style": 2,       // disallow mixed ‘LF’ and ‘CRLF’ as linebreaks

    // enforce empty lines around comments
    "lines-around-comment": [1, {
      "beforeBlockComment": true,
      "beforeLineComment": false,
      "allowBlockStart": true,
      "allowBlockEnd": true,
      "allowObjectStart": true,
      "allowObjectEnd": true,
      "allowArrayStart": true,
      "allowArrayEnd": true
    }],

    "max-depth": 0,             // specify the maximum depth that blocks can be nested
    "max-len": 0,               // specify the maximum length of a line in your program
    "max-nested-callbacks": [0, 3],  // specify the maximum depth callbacks can be nested
    "max-params": 0,            // limits the number of parameters in a function declaration
    "max-statements": 0,        // specify the maximum number of statement allowed in a function

    // require a capital letter for constructors
    "new-cap": [2, {
      "newIsCap": true,
      "capIsNew": true,
      "newIsCapExceptions": [],
      "properties": true
    }],
    "new-parens": 2,            // require parentheses when invoking a constructor with no arguments
    "newline-after-var": 0,     // require/disallow an empty newline after var statement
    "newline-before-return": 0, // require newline before return statement
    "newline-per-chained-call": 0,  // enforce newline after each call when chaining the calls
    "no-array-constructor": 2,  // disallow use of the Array constructor
    "no-bitwise": 1,            // disallow use of bitwise operators
    "no-continue": 0,           // disallow use of the continue statement
    "no-inline-comments": 0,    // disallow comments inline after code
    "no-lonely-if": 1,          // disallow if as the only statement in an else block
    "no-mixed-spaces-and-tabs": 2,  // disallow mixed spaces and tabs for indentation
    "no-multiple-empty-lines": [1, {"max": 2}],  // disallow multiple empty lines
    "no-negated-condition": 1,  // disallow negated conditions
    "no-nested-ternary": 1,     // disallow nested ternary expressions (off by default)
    "no-new-object": 2,         // disallow use of the Object constructor
    "no-plusplus": 0,           // disallow use of unary operators, ++ and --
    //"no-restricted-syntax": 0,  // disallow use of certain syntax in code
    "no-spaced-func": 2,        // disallow space between function identifier and application       (fixable)
    "no-ternary": 0,            // disallow the use of ternary operators (off by default)
    "no-trailing-spaces": 1,    // disallow trailing whitespace at the end of lines                 (fixable)
    "no-underscore-dangle": 0,  // disallow dangling underscores in identifiers
    "no-unneeded-ternary": 1,   // disallow the use of ternary operators when a simpler alternative exists
    "no-whitespace-before-property": 2,  // disallow whitespace before properties

    // require or disallow padding inside curly braces                                              (fixable)
    "object-curly-spacing": [1, "always"],

    "one-var": [0, "never"],              // allow just one var statement per function
    "one-var-declaration-per-line": 0,    // require or disallow a newline between variable declarations
    "operator-assignment": [0, "never"],  // require or disallow assignment operator shorthand
    "operator-linebreak": [0, "before"],  // require operators to be placed after line breaks
    "padded-blocks": [1, "never"],        // discourage padding within blocks
    "quote-props": [1, "as-needed"],      // discourage quotes around object literal property names
    "quotes": [1, "single", "avoid-escape"], // require single quotes (fixable)

    // require JSDoc comment
    "require-jsdoc": [0, {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true
      }
    }],

    "semi": [0, "always"],      // require semicolons at the end of statements                      (fixable)

    // enforce spacing before and after semicolons                                                  (fixable)
    "semi-spacing": [1, {"before": false, "after": true}],

    "sort-imports": 0,          // sort import declarations within module
    "sort-vars": 0,             // sort variables within the same declaration block
    "space-before-blocks": [1, "always"],  // require one space before blocks                       (fixable)

    // require a space before function opening parenthesis                                          (fixable)
    "space-before-function-paren": [1, {"anonymous": "always", "named": "never"}],

    "space-in-parens": [1, "never"],  // require or disallow spaces inside parentheses              (fixable)
    "space-infix-ops": [1],           // require spaces around operators                            (fixable)

    // Enforce conventions regarding spaces before/after unary operators                            (fixable)
    "space-unary-ops": [1, {"words": true, "nonwords": false}],

    // require a space immediately following the // or /* in a comment, with exceptions             (fixable)
    "spaced-comment": [0, "always", {
      "line": {
        "markers": ["/"]
      },
      "block": {
        "exceptions": ["*"]
      }
    }],

    "wrap-regex": 1,            // require regex literals to be wrapped in parentheses

    // ECMAScript 6 --------------------------------------------------------------------------------
    //
    "arrow-body-style": 0,      // do not require braces for single statement arrow function bodies
    "arrow-parens": 0,          // do not require parens for arrow function with a single argument
    "arrow-spacing": 1,         // require space before/after arrow function’s arrow                (fixable)
    "constructor-super": 1,     // draw attention to missing super() calls in constructors

    // require space before but not after the * in generator functions                              (fixable)
    "generator-star-spacing": [1, {
      "before": false,
      "after": true
    }],

    "no-class-assign": 2,       // disallow modifying class declaration variables
    "no-confusing-arrow": 1,    // disallow arrow functions where they mey be confused with comparisons
    "no-const-assign": 2,       // disallow modifying variables that are declared using const
    "no-dupe-class-members": 2, // disallow class members that have the same name
    "no-new-symbol": 2,         // disallow use of the new operator with the Symbol object
    "no-this-before-super": 2,  // disallow use of this/super before calling super() in constructors
    "no-useless-constructor": 1, // disallow unnecessary constructor
    "no-var": 1,                // encourage let or const instead of var
    "object-shorthand": 1,      // encourage method and property shorthand syntax for object literals
    "prefer-arrow-callback": 1, // encourage using arrow functions as callbacks
    "prefer-const": 1,          // encourage const declaration for variables that are never modified
    "prefer-reflect": 0,        // encourage using Reflect methods where applicable
    "prefer-rest-params": 1,    // encourage using the rest parameters instead of arguments
    "prefer-spread": 1,         // encourage using the spread operator instead of .apply()
    "prefer-template": 1,       // encourage using template literals instead of strings concatenation
    "require-yield": 1,         // disallow generator functions that do not have yield
    "template-curly-spacing": 2, // no spacing around embedded expressions of template strings       (fixable)
    "yield-star-spacing": [1, "before"],  // enforce spacing around the * in yield* expressions     (fixable)

    // #############################################################################################
    // Import plugin
    //
    // For potential additional rules not already in recommended configuration, see:
    //   https://github.com/benmosher/eslint-plugin-import

    // Static analysis:
    "import/no-unresolved": 0,      // Ensure imports point to a file/module that can be resolved.
    "import/named": 2,              // Ensure named imports correspond to a named export in the remote file.
    "import/default": 0,            // Ensure a default export is present, given a default import.
    "import/namespace": 2,          // Ensure imported namespaces contain dereferenced properties as they are dereferenced.
    "import/no-restricted-paths": 2, // Restrict which files can be imported in a given folder (no-restricted-paths).

    // Helpful warnings:
    "import/export": 1,             // Report any invalid exports, i.e. re-export of the same name.
    "import/no-named-as-default": 1, // Report use of exported name as identifier of default export.
    "import/no-named-as-default-member": 1, // Report use of exported name as property of default export.
    "import/no-deprecated": 1,      // Report imported names marked with @deprecated documentation tag.
    "import/no-extraneous-dependencies": 0, // Forbid the use of extraneous packages.
    "import/no-mutable-exports": 1, // Forbid the use of mutable exports with var or let.

    // Module systems:
    "import/no-commonjs": 1,        // Report CommonJS require calls and module.exports or exports.*.
    "import/no-amd": 2,             // Report AMD require and define calls.
    "import/no-nodejs-modules": 0,  // No Node.js builtin modules.

    // Style guide:
    "import/imports-first": 1,      // Ensure all imports appear before other statements.
    "import/no-duplicates": 1,      // Report repeated import of the same module in multiple places.
    "import/no-namespace": 1,       // Report namespace imports.
    "import/extensions": [0, "always"], // Ensure consistent use of file extension within the import path.
    "import/order": [1, {"newlines-between": "always"}], // Enforce a convention in module import order.
    "import/newline-after-import": 1, // Enforce a newline after import statements.
    "import/prefer-default-export": 1, // Prefer a default export if module exports a single name.

    // #############################################################################################
    // React plugin
    //
    // For potential additional rules not already in recommended configuration, see:
    //   https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules

    "react/display-name": 1,        // Prevent missing displayName in a React component definition
    "react/forbid-prop-types": 0,   // Forbid vague propTypes, replace with arrayOf, shape, etc.
    "react/no-danger": 1,           // Prevent usage of dangerous JSX properties
    "react/no-deprecated": 2,       // Prevent usage of deprecated methods
    "react/no-did-mount-set-state": 2, // Prevent usage of setState in componentDidMount
    "react/no-did-update-set-state": 2, // Prevent usage of setState in componentDidUpdate
    "react/no-direct-mutation-state": 2, // Prevent direct mutation of this.state
    "react/no-find-dom-node": 2,    // Prevent usage of findDOMNode
    "react/no-is-mounted": 2,       // Prevent usage of isMounted
    "react/no-multi-comp": 1,       // Prevent multiple component definition per file
    "react/no-render-return-value": 2, // Prevent usage of the return value of React.render
    "react/no-set-state": 0,        // Prevent usage of setState
    "react/no-string-refs": 2,      // Prevent using string references in ref attribute.
    "react/no-unknown-property": 2, // Prevent usage of unknown DOM property
    "react/prefer-es6-class": 1,    // Prefer ES5 or ES6 class for React Components
    "react/prefer-stateless-function": 1, // Prefer stateless React Components to be written as a pure function
    "react/prop-types": 1,          // Prevent missing props validation in a React component definition
    "react/react-in-jsx-scope": 2,  // Prevent missing React when using JSX
    // deprecated > import/extensions "react/require-extension": 2,   // Restrict file extensions that may be required
    "react/require-optimization": 0, // Prefer React components to have a shouldComponentUpdate method
    "react/require-render-return": 1, // Prefer ES5 or ES6 class for returning value in render function
    "react/self-closing-comp": 1,   // Prevent extra closing tags for components without children
    "react/sort-comp": 1,           // Prefer component methods order
    "react/sort-prop-types": [1, { "ignoreCase": true }], // Enforce props alphabetical sorting

    "react/jsx-boolean-value": [1, "never"], // Enforce boolean attributes notation in JSX (fixable)
    "react/jsx-closing-bracket-location": 1, // Validate closing bracket location in JSX (fixable)
    "react/jsx-curly-spacing": [1, "never"], // Enforce or disallow spaces inside of curly braces in JSX attributes (fixable)
    "react/jsx-equals-spacing": [1, "never"], // Enforce or disallow spaces around equal signs in JSX attributes (fixable)
    "react/jsx-filename-extension": 2, // Restrict file extensions that may contain JSX
    "react/jsx-first-prop-new-line": [1, "multiline"], // Enforce position of the first prop in JSX
    "react/jsx-handler-names": 0,   // Enforce event handler naming conventions in JSX
    "react/jsx-indent": [1, 2],     // Validate JSX indentation
    "react/jsx-indent-props": [1, 2], // Validate props indentation in JSX (fixable)
    "react/jsx-key": 2,             // Validate JSX has key prop when in array or iterator
    "react/jsx-max-props-per-line": 0, // Limit maximum of props on a single line in JSX
    "react/jsx-no-bind": 0,         // Prevent usage of .bind() and arrow functions in JSX props
    "react/jsx-no-comment-textnodes": 1, // Prevent comments from being inserted as text nodes
    "react/jsx-no-duplicate-props": 1, // Prevent duplicate props in JSX
    "react/jsx-no-literals": 0,     // Prevent usage of unwrapped JSX strings
    "react/jsx-no-target-blank": 2, // Prevent usage of unsafe target='_blank'
    "react/jsx-no-undef": 2,        // Disallow undeclared variables in JSX
    "react/jsx-pascal-case": 1,     // Enforce PascalCase for user-defined JSX components
    "react/jsx-sort-props": 0,      // Enforce props alphabetical sorting
    "react/jsx-space-before-closing": 1, // Validate spacing before closing bracket in JSX (fixable)
    "react/jsx-uses-react": 1,      // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-vars": 1,       // Prevent variables used in JSX to be incorrectly marked as unused
    "react/jsx-wrap-multilines": 1, // Prevent missing parentheses around multilines JSX (fixable)
  }
}
