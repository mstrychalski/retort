import { h } from 'virtual-dom'
import { emojiUrlFor } from 'discourse/lib/text'

export default Ember.Object.create({
  render(widget) {
    this.state = widget.state
    return [this.emoji(), this.count(), this.tooltip()]
  },

  emoji() {
    return h('img.emoji', { src: emojiUrlFor(this.state.emoji), alt: `:${this.state.emoji}:` })
  },

  count() {
    if (this.state.usernames.length < 2) { return }
    return h('span.post-retort-count', this.state.usernames.length.toString())
  },

  tooltip() {
    return h('span.post-retort-tooltip', this.sentence())
  },

  sentence() {
    let usernames = this.state.usernames
    switch(usernames.length) {
      case 1:  return `${usernames[0]} zareagował używając :${this.state.emoji}:`
      case 2:  return `${usernames[0]} i ${usernames[1]} zareagował używając :${this.state.emoji}:`
      default: return `${usernames[0]}, ${usernames[1]} i ${usernames.length - 2} innych zareagowało używając :${this.state.emoji}:`
    }
  }

})
