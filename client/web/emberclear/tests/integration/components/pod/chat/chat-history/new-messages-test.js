import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { newMessages as definition } from 'emberclear/tests/helpers/page-objects';
import { create } from 'ember-cli-page-object';
import { getService } from 'emberclear/tests/helpers';
import { settled } from '@ember/test-helpers';

module('Integration | Component | chat/chat-history/new-messages', function (hooks) {
  setupRenderingTest(hooks);

  let page = create(definition);

  test('it renders', async function (assert) {
    let chatScroller = getService('chat-scroller');

    await render(hbs`<Pod::Chat::ChatHistory::NewMessages />`);

    assert.dom(page.scope).exists();
    assert.dom(page.scope).hasClass('hidden');

    chatScroller.isLastVisible = false;
    await settled();

    assert.dom(page.scope).doesNotHaveClass('hidden');
  });
});
