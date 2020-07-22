/**
 * @fileoverview console warn only dev
 * @author anzhi
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "console.warn only when dev",
            category: "Fill me in",
            recommended: false
        },
        fixable: "code",  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here
        const sourceCode = context.getSourceCode();
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            CallExpression(node) {
                if (!(node.callee.type === 'MemberExpression' && node.callee.object.name === 'console' && node.callee.property.name === 'warn')) return;
                let ifStatement = null;
                let parent = node;
                while (parent.parent && !ifStatement) {
                    if (parent.parent.type === 'IfStatement') {
                        ifStatement = parent.parent;
                    } else {
                        parent = parent.parent;
                    }
                }
                if (!ifStatement || !sourceCode.getText(ifStatement.test).includes("__DEV__ && console.warn")) {
                    context.report({
                        node,
                        message: "console.warn without dev",
                        fix: function (fixer) {
                            return fixer.replaceText(node, `if (__DEV__ && console.warn)\n{${sourceCode.getText(node)};\n}`)
                        }
                    })
                }
            }
        };
    }
};
