/**
 * @fileoverview no deprecated comment
 * @author anzhi
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "no deprecated comment",
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
            FunctionExpression(node) {
                const JSDocComment = sourceCode.getJSDocComment(node);
                if (!JSDocComment) return;
                let r = JSDocComment.value.match(/@deprecated(.*)\n/);
                if (r) {
                    const expreBodys = node.body.body.filter(({ type, expression }) => (type === 'ExpressionStatement' && expression.type === 'CallExpression' && expression.callee.type === 'MemberExpression' && expression.callee.object.name === 'console' && expression.callee.property.name === 'warn'));
                    const expreBodys2 = node.body.body.filter(({ type, consequent }) => (type === 'IfStatement' && consequent.body && consequent.body.length > 0 && consequent.body[0].type === 'ExpressionStatement' && consequent.body[0].expression.type === 'CallExpression' && consequent.body[0].expression.callee.type === 'MemberExpression' && consequent.body[0].expression.callee.object.name === 'console' && consequent.body[0].expression.callee.property.name === 'warn'));
                    const comment = `if (__DEV__ && console.warn)\n{console.warn("deprecated ${r[1]}");\n}\n`;
                    (expreBodys.length == 0 && expreBodys2.length == 0) && context.report({
                        node,
                        message: "deprecated no warn",
                        fix: function(fixer) {
                            return fixer.insertTextBefore(node.body.body[0], comment);
                        }
                    })
                }
            }
        };
    }
};
