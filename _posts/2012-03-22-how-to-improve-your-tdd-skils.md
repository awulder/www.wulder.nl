---
layout: post
title: How to improve your TDD skills?
tags:
- Testing
- TDD
- Test Driven Development
- Development
---

Do you think that you do TDD well because you have done it for years now? That is what I thought until I did an exercise called “TDD as if you mean it” and it put my feet back on the ground!

At two different TDD workshops I have tried to build an application after the rules “TDD as if you mean it”. The first time was in Amsterdam at a <a href="http://coderetreat.org/about" target="_blank">Coderetreat</a> and the second time at an XKE session at Xebia. Although I am practicing TDD for a while now, the result of the exercises in both sessions were that I had few tests, even less production code and an application that did not work.

### TDD as if you mean it
TDD itself is a simple process. Kent Beck's description of a single TDD cycle is:

1. Add a little test
2. Run all tests and fail
3. Make a little change
4. Run the tests and succeed
5. Refactor to remove duplication
6. Go to (1)

I think most developers are using this set of rules, or something similar, for a single TDD cycle when they are saying that they are practicing TDD. “TDD as if you mean it” has different rules for a single TDD cycle:


1. Write exactly one failing test
2. Make the test from (1) pass by first writing implementation code in the test itself
3. Create a new implementation method/function by:

   1. Doing “extract method” on implementation code created as per (2), or
   2. Moving implementation code as per (2) into an existing implementation method
4. Only create new methods in the test class
5. Only create implementation classes to give a destination for extracting a method created as per (4).
6. Populate implementation classes by doing “move method” from a test class into the implementation classes<
7. Refactor
8. Go to (1)

The main difference is that the “TDD as if you mean it” rules were designed to strictly let the domain code evolve from the test code in baby steps. Baby steps are the smallest possible changes to make your test pass.

### The exercise
At an XKE at Xebia we had to build an <a href="http://en.wikipedia.org/wiki/Enigma_machine" target="_blank">Enigma machine</a>. We received a description on paper about how the Enigma machine worked and how the different parts like the rotors and the reflector are responsible for certain behavior. My pair partner and I agreed to doing “TDD as if you mean it” so wrote our first test and then we were stuck. We stared at the screen and start discussing about the different parts of an Enigma machine but that is not what this exercise was about. We should let go of the idea that the domain *must have* rotors and a reflector and let our tests determine the design and domain. In addition, we could not see how the first simple tests would evolve into a working Enigma machine. With some help of one of the facilitators we wrote some more tests but we often got strangled in a discussion about rotors and the reflector.

The next couple of TDD cycles will give you an idea why my pair partner and I thought the first tests were pointless and could not end up in a working Enigma machine. You will also see how the code evolves after just a few cycles.

#### Cycle 1 – translate one character
{% highlight java %}
@Test
public void shouldTranslateCharacter() throws Exception {
  assertThat(translate("A"), is("T"));
}

private String translate(String input) {
  if ("A".equals(input)) {
    return "T";
  }
  return "";
}
{% endhighlight %}

#### Cycle 2 – translate second character
{% highlight java %}
@Test
public void shouldTranslateCharacter() throws Exception {
  assertThat(translate("A"), is("T"));
  assertThat(translate("B"), is("S"));
}

private String translate(String input) {
  if ("A".equals(input)) {
    return "T";
  } else if ("B".equals(input)) {
    return "S";
  }
  return "";
}
{% endhighlight %}

#### Cycle 3 – translate third character
{% highlight java %}
@Test
public void shouldTranslateCharacter() throws Exception {
  assertThat(translate("A"), is("T"));
  assertThat(translate("B"), is("S"));
  assertThat(translate("C"), is("N"));
}

private String translate(String input) {
  if ("A".equals(input)) {
    return "T";
  } else if ("B".equals(input)) {
    return "S";
  } else if ("C".equals(input)) {
    return "N";
  }
  return "";
}
{% endhighlight %}

#### Cycle 4 – after refactoring
{% highlight java %}
@Test
public void shouldTranslateCharacter() throws Exception {
  assertThat(translate("A"), is("T"));
  assertThat(translate("B"), is("S"));
  assertThat(translate("C"), is("N"));
}

private String translate(String input) {
  Map<String, String> alphabet = new HashMap<String, String>();
  alphabet.put("A", "T");
  alphabet.put("B", "S");
  alphabet.put("C", "N");

  return alphabet.get(input);
}
{% endhighlight %}

The translate method in the tests is translating the input character into a cyphered character. This is the behavior that looks like the behavior of a rotor or even the whole Enigma machine. You could imagine that the translate method will eventually move to a Translator class instead of a Rotor class. What you will do is that you put methods with common behavior in a single class and that brings us to one of the basic ideas of Eric Evans' domain modeling that the best models are not the most realistic ones, but the ones that allow us to describe a particular problem efficiently. As I mentioned before at the end of the XKE we had just a few tests and even less production code but we learned some valuable things.

### What I have learnt
After two TDD sessions where I followed the rules of “TDD as if you mean it” I have learnt:

* It is hard to let go of the domain, in this case the rotors and the reflector, and let the tests determine the design and domain. In the beginning I thought that I should need a rotor or reflector or I could not write any test and I knew that I that I needed a rotor.
* The first tests seems pointless because of the baby steps you take. You get tests like 1 == 2 for example that you fix in the test class.
* The production code that I have written was very “clean”. That means small methods with only one responsibility (SRP).

Therefore I would suggest that if you want to train your TDD skills then “TDD as if you mean it” is an excellent exercise. During the XKE session we used the Enigma machine but tic-tac-toe or Conrad's Game of life are also often used for this purpose.
