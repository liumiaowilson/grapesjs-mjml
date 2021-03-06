// Specs: https://mjml.io/documentation/#mjml-location

export default (editor, {
  dc, opt, linkModel, linkView, coreMjmlModel, coreMjmlView
}) => {
  const type = 'mj-location';

  dc.addType(type, {


    model: linkModel.extend({ ...coreMjmlModel,

      defaults: { ...linkModel.prototype.defaults,
        'custom-name': 'Location',
        draggable: '[data-type=mj-column], [data-type=mj-hero-content]',
        highlightable: false,
        stylable: ['color', 'font-family', 'font-size', 'font-weight',
            'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'
        ],
        'style-default': {
          'align': 'center',
        },
        traits: ['href', 'address'],
      },
    },{

      isComponent(el) {
        if (el.tagName == type.toUpperCase()) {
          return { type };
        }
      },
    }),


    view: linkView.extend({ ...coreMjmlView,

      tagName: 'tr',

      attributes: {
        style: 'pointer-events: all; display: table; width: 100%',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('tr').innerHTML;
      },

      getChildrenSelector() {
        return 'a,p';
      },

      enableEditing() {
        if(opt.readOnly) {
          return;
        }
        linkView.prototype.enableEditing.apply(this, arguments);
      },

      /**
       * Prevent content repeating
       */
      renderChildren() {
        coreMjmlView.renderChildren.call(this);
      },
    }),
  });
}
