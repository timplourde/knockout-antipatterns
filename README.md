

# Knockout.js (Anti-)Patterns

## Introduction

This presentation is heavily inspired by [this talk](http://vimeo.com/73627803) by Ryan Niemeyer and my own experience in building non-trivial apps with [Knockout.js](http://http://knockoutjs.com/).

## ViewModels knowing about Views

Knockout is great because it does one thing very well: data binding.  After just a few hours learning Knockout, you be building complex apps and impressing your friends in no time.  

The key to making sure those fancy apps are testable and maintainable is to understand and apply the MVVM pattern.  There is a lot of informaiton on the pattern available online, most of which is centered in C#/XAML (where it originated from).  Here is a [simple introduction](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm) from a JavaScript angle.

Don't worry if you don't have a PhD in MVVM.  The main thing you need to remember is **the View should not know about the ViewModel**.  This simple rule will help you build testable and maintainable apps.

**VIEW**

* HTML, CSS, other assets
* Binds to View Model
* Passive and typically not unit tested

**VIEW MODEL**

* Unaware of the View
* Presents Models to the View
* Fully unit-testable

**MODEL**

* Unaware of the ViewModel
* Business domain
* Can be observable
* (Sometimes) includes other concerns like persistence
* Fully unit-testable


### Anti-Pattern 1: DOM manipulation in Knockout ViewModels

Once your VM has any knowledge of the DOM then it knows about your View, breaking MVVM.  With Knockout binding handlers there is really no reason to have any DOM-related code in your ViewModels.

### Anti-Pattern 2: (Non-semantic) CSS in ViewModels

This is contraversial since it appears in the [Knockout documentation](http://knockoutjs.com/documentation/css-binding.html).  You should avoid generating CSS class names from ViewModels if those class names have no semantic meaning and only exist for visual styling.

### Anti-Pattern 3: applyBindings() inside ViewModel code

This is another DOM reference.  Make sure you call applyBindings outside of ViewModels, perferably supplying a specific DOM node instead of the entire document.

## Going Overboard

### Anti-Pattern 4: Over-observing

Every observable is expensive.  When creating computeds, make sure you actually **need** to return something the instant a dependency changes. 

### Anti-Pattern 5: Using subscriptions for input sanitization

Subscribing to changes, intercepting the value and setting the value again triggers unnecessary dependency tracking.  Use extenders instead. 

### Anti-Pattern NAH: DIY dirty tracking

Instead of manually subscribing to everything, lean on ko.toJSON

### Anti-Pattern 6: over-binding in large collections

Don't bind events to every item in a collection, use delegatedEvents instead

### Anti-Pattern 7: not throttling

You should probably throttle all computeds that hit large collections or take a while to finish.

## Brittle Views

HTML can't be unit tested, so the more logic you have in it the more brittle your application is.  

### Anti-Pattern 8: inline functions in data-binding statements

Put all inline functions in data-bind statements into proper methods so you can unit test them

### Anti-Pattern 9: Too much logic in HTML comments

Instead of lots of conditional logic, encapsulate it in an object which can be unit tested
