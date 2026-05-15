/* ============================================================
   Ordinary Water — shared site script
   - Mobile nav toggle
   - Footer year + copy-link
   - Reveal-on-scroll
   - Emoji-gospel accordion
   - Date-seeded "Verse of the Day"
   - Curated "Ask Faith" Q&A engine
   No build step, no dependencies. Safe to edit by hand.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var btn = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Copy-link buttons ---------- */
  function initCopyLinks() {
    document.querySelectorAll("[data-copy-link]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var url = btn.getAttribute("data-copy-link") || "https://ordinarywater.online";
        var label = btn.querySelector("[data-copy-label]");
        var done = function () {
          if (!label) return;
          var original = label.textContent;
          label.textContent = "Link copied!";
          setTimeout(function () { label.textContent = original; }, 2200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done).catch(done);
        } else {
          var t = document.createElement("textarea");
          t.value = url; document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(t); done();
        }
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Emoji-gospel accordion ---------- */
  function initGospelAccordion() {
    var steps = document.querySelectorAll(".gospel-step");
    if (!steps.length) return;
    steps.forEach(function (step) {
      var head = step.querySelector(".gospel-head");
      if (!head) return;
      head.addEventListener("click", function () {
        var isOpen = step.classList.contains("open");
        // Open one at a time for a calm, guided read
        steps.forEach(function (s) {
          s.classList.remove("open");
          var h = s.querySelector(".gospel-head");
          if (h) h.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          step.classList.add("open");
          head.setAttribute("aria-expanded", "true");
        }
      });
    });
    // Open the first movement by default
    steps[0].classList.add("open");
    var firstHead = steps[0].querySelector(".gospel-head");
    if (firstHead) firstHead.setAttribute("aria-expanded", "true");
  }

  /* ---------- Verse of the Day ---------- */
  var VERSES = [
    { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    { ref: "Psalm 139:13-14", text: "For you created my inmost being; you knit me together in my mother's womb. I praise you because I am fearfully and wonderfully made." },
    { ref: "Revelation 3:20", text: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in." },
    { ref: "Romans 5:8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." },
    { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
    { ref: "John 4:14", text: "Whoever drinks the water I give them will never thirst. It will become in them a spring of water welling up to eternal life." },
    { ref: "Romans 6:23", text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." },
    { ref: "John 10:10", text: "I have come that they may have life, and have it to the full." },
    { ref: "Romans 10:9", text: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved." },
    { ref: "Romans 10:13", text: "Everyone who calls on the name of the Lord will be saved." },
    { ref: "Matthew 28:6", text: "He is not here; he has risen, just as he said. Come and see the place where he lay." },
    { ref: "John 14:6", text: "I am the way and the truth and the life. No one comes to the Father except through me." },
    { ref: "Psalm 34:8", text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him." },
    { ref: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God." },
    { ref: "2 Corinthians 5:17", text: "If anyone is in Christ, the new creation has come: The old has gone, the new is here!" },
    { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God." },
    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him." },
    { ref: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you." },
    { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
    { ref: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning." },
    { ref: "John 8:12", text: "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life." },
    { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
    { ref: "Matthew 5:6", text: "Blessed are those who hunger and thirst for righteousness, for they will be filled." },
    { ref: "Psalm 42:1-2", text: "As the deer pants for streams of water, so my soul pants for you, my God. My soul thirsts for God, for the living God." },
    { ref: "Isaiah 59:2", text: "But your iniquities have separated you from your God; your sins have hidden his face from you." },
    { ref: "Romans 3:23", text: "For all have sinned and fall short of the glory of God." },
    { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
    { ref: "John 1:14", text: "The Word became flesh and made his dwelling among us. We have seen his glory, full of grace and truth." },
    { ref: "Revelation 22:17", text: "Let the one who is thirsty come; and let the one who wishes take the free gift of the water of life." }
  ];

  function dayOfYear(d) {
    var start = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d - start) / 86400000);
  }

  function initDailyVerse() {
    var textEl = document.getElementById("daily-verse-text");
    var refEl = document.getElementById("daily-verse-ref");
    if (!textEl || !refEl) return;
    var idx = dayOfYear(new Date()) % VERSES.length;
    var v = VERSES[idx];
    textEl.textContent = "“" + v.text + "”";
    refEl.textContent = "— " + v.ref;
  }

  /* ---------- Ask Faith — curated Q&A ----------
     Hand-written, Scripture-grounded answers. Edit freely:
     add/remove objects, keep the { q, a } shape. `a` accepts HTML. */
  var FAITH_QA = [
    {
      q: "What does ❤️➗✝️❓ mean?",
      tags: "emoji gospel symbols meaning four",
      a: "<p>The four symbols are a simple way to tell the whole story of the good news:</p>" +
         "<p><strong>❤️</strong> &mdash; God made you and loves you.<br>" +
         "<strong>➗</strong> &mdash; but sin separates us from Him.<br>" +
         "<strong>✝️</strong> &mdash; Jesus died and rose to bridge that gap.<br>" +
         "<strong>❓</strong> &mdash; now the question is yours: what will you do with Him?</p>" +
         "<p>You can walk through the full message on the home page.</p>"
    },
    {
      q: "Who is Jesus?",
      tags: "jesus god who identity",
      a: "<p>Jesus is not just a good teacher or a distant historical figure. Christians believe He is God Himself, who stepped into human history. He lived the perfect life we couldn't, died in our place, and rose from the dead.</p>" +
         "<blockquote>“In the beginning was the Word... and the Word was God... The Word became flesh and made his dwelling among us.”<br>&mdash; John 1:1,14</blockquote>"
    },
    {
      q: "What is the gospel?",
      tags: "gospel good news meaning",
      a: "<p>“Gospel” simply means <em>good news</em>. The good news is that even though our sin separated us from God, God Himself made a way back through Jesus.</p>" +
         "<p>It isn't advice on how to earn God's love &mdash; it's an announcement that He already came to rescue us.</p>"
    },
    {
      q: "What is sin?",
      tags: "sin wrong bad standard",
      a: "<p>Sin is anything that falls short of God's perfect standard &mdash; not only the “big” things, but the everyday selfishness, pride, and broken places in all of us.</p>" +
         "<blockquote>“For all have sinned and fall short of the glory of God.”<br>&mdash; Romans 3:23</blockquote>" +
         "<p>Sin matters because it separates us from a holy God.</p>"
    },
    {
      q: "Why do I need saving?",
      tags: "saved need rescue why",
      a: "<p>Because sin has real consequences &mdash; it builds a wall between us and God that we can't tear down on our own.</p>" +
         "<blockquote>“The wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.”<br>&mdash; Romans 6:23</blockquote>" +
         "<p>We can't simply be good enough to fix it. We need a rescuer &mdash; and that's exactly who Jesus is.</p>"
    },
    {
      q: "I've done too much to be forgiven.",
      tags: "forgiven guilt shame past too much unforgivable",
      a: "<p>There is no sin too big for God's grace. The Bible is full of people who failed badly and were still met with mercy.</p>" +
         "<blockquote>“While we were still sinners, Christ died for us.”<br>&mdash; Romans 5:8</blockquote>" +
         "<p>He didn't wait for you to clean yourself up &mdash; He came <em>while</em> you were still in the mess. Forgiveness isn't earned; it's received.</p>"
    },
    {
      q: "How do I become a Christian?",
      tags: "become christian start saved how begin",
      a: "<p>It's simpler than people think. You don't need a special formula or to fix your life first.</p>" +
         "<blockquote>“If you declare with your mouth, ‘Jesus is Lord,’ and believe in your heart that God raised him from the dead, you will be saved.”<br>&mdash; Romans 10:9</blockquote>" +
         "<p>You can talk to God honestly right now: admit you need Him, believe Jesus died and rose for you, and ask Him to be the Lord of your life.</p>"
    },
    {
      q: "What do I pray?",
      tags: "pray prayer words how salvation",
      a: "<p>There are no magic words &mdash; God hears your heart. But if you want one, you could pray something like this:</p>" +
         "<blockquote>“God, I know I've fallen short and I can't fix it myself. I believe Jesus died for me and rose again. I'm turning to You &mdash; please forgive me, come into my life, and lead me from here. Thank You. Amen.”</blockquote>" +
         "<p>If you mean it, He hears it.</p>"
    },
    {
      q: "What do I do after I believe?",
      tags: "next steps after believe new christian grow",
      a: "<p>Three simple next steps:</p>" +
         "<p><strong>1. Talk to God daily.</strong> That's prayer &mdash; just honest conversation.<br>" +
         "<strong>2. Read the Bible.</strong> The Gospel of John is a great place to start.<br>" +
         "<strong>3. Find a church family.</strong> You're not meant to do this alone.</p>" +
         "<p>And tell someone &mdash; saying it out loud makes it real.</p>"
    },
    {
      q: "How do I find a church?",
      tags: "church find community where",
      a: "<p>Look for a church near you that teaches the Bible and where you sense genuine community. Ask a Christian friend, or search churches in your area and visit a couple.</p>" +
         "<p>It can feel awkward the first time &mdash; that's completely normal. Reach out through our <a href=\"connect.html#contact\" class=\"text-tertiary underline\">Connect page</a> and we'll help you find one.</p>"
    },
    {
      q: "Do I have to be religious?",
      tags: "religious religion rules performance",
      a: "<p>No. Following Jesus isn't about religious performance &mdash; it's a relationship. Jesus actually saved His sharpest words for the religious people of His day, and welcomed the ones everyone else wrote off.</p>" +
         "<blockquote>“Come to me, all you who are weary and burdened, and I will give you rest.”<br>&mdash; Matthew 11:28</blockquote>"
    },
    {
      q: "Why does God allow suffering?",
      tags: "suffering pain evil hard why hurt",
      a: "<p>This is one of the hardest questions, and it deserves honesty: the Bible doesn't hand us a tidy formula.</p>" +
         "<p>But it does show a God who refuses to stay distant from pain &mdash; He entered it. Jesus suffered, wept, and died. Whatever you're carrying, you are not facing it alone, and the story isn't over.</p>"
    },
    {
      q: "How do I know God is real?",
      tags: "god real exist proof evidence doubt",
      a: "<p>Faith isn't a leap into the dark. There are good reasons to believe &mdash; the existence of the universe, the moral sense we all share, the historical evidence for Jesus' resurrection, and millions of changed lives.</p>" +
         "<p>But God also invites you to test it personally:</p>" +
         "<blockquote>“Taste and see that the Lord is good.”<br>&mdash; Psalm 34:8</blockquote>"
    },
    {
      q: "Is the Bible reliable?",
      tags: "bible reliable trust true history",
      a: "<p>The Bible is the best-attested document of the ancient world, with thousands of early manuscripts that agree remarkably well.</p>" +
         "<p>More than a history book, it's how God still speaks today. The best way to weigh it is to read it &mdash; start with the Gospel of John.</p>"
    },
    {
      q: "I have doubts. Is that okay?",
      tags: "doubt doubts questions unsure okay",
      a: "<p>Yes. Doubt isn't the opposite of faith &mdash; it's often part of it. Some of the most faithful people in the Bible asked hard questions.</p>" +
         "<blockquote>“I do believe; help me overcome my unbelief!”<br>&mdash; Mark 9:24</blockquote>" +
         "<p>Jesus didn't turn that man away. Bring your doubts honestly to God &mdash; He can handle them.</p>"
    },
    {
      q: "What about other religions?",
      tags: "other religions islam buddhism difference unique",
      a: "<p>Many religions offer good moral teaching. What makes Jesus different is that He didn't just point to a way &mdash; He claimed to <em>be</em> the way, and then backed it up by rising from the dead.</p>" +
         "<blockquote>“I am the way and the truth and the life.”<br>&mdash; John 14:6</blockquote>" +
         "<p>That's a claim worth investigating for yourself.</p>"
    },
    {
      q: "What happens when we die?",
      tags: "death die afterlife heaven eternity",
      a: "<p>The Bible teaches that this life isn't all there is. For those who trust Jesus, death isn't the end &mdash; it's the doorway home, to be with God forever.</p>" +
         "<blockquote>“Whoever believes in him shall not perish but have eternal life.”<br>&mdash; John 3:16</blockquote>" +
         "<p>That's why the question of what you do with Jesus matters so much.</p>"
    },
    {
      q: "What is baptism?",
      tags: "baptism baptized water meaning",
      a: "<p>Baptism is a public picture of an inward change &mdash; going under the water symbolizes dying to your old life, and coming up symbolizes new life in Christ.</p>" +
         "<p>It doesn't save you (Jesus does), but it's the first step of obedience and a way of telling the world you belong to Him.</p>"
    },
    {
      q: "What is “living water”?",
      tags: "living water ordinary meaning thirst well",
      a: "<p>It's a phrase Jesus used. He met a woman at a well and told her that ordinary water leaves you thirsty again &mdash; but He offers “living water.”</p>" +
         "<blockquote>“The water I give them will become in them a spring of water welling up to eternal life.”<br>&mdash; John 4:14</blockquote>" +
         "<p>Ordinary water keeps you alive for a day. Living water &mdash; life with Jesus &mdash; satisfies the deeper thirst.</p>"
    },
    {
      q: "How do I share this with someone else?",
      tags: "share evangelism tell others how",
      a: "<p>The same way it reached you. You don't need to be an expert &mdash; just share the four symbols (❤️➗✝️❓), tell your own story, and point people here.</p>" +
         "<blockquote>“Everyone who calls on the name of the Lord will be saved.”<br>&mdash; Romans 10:13</blockquote>" +
         "<p>The <a href=\"connect.html#get-involved\" class=\"text-tertiary underline\">Connect page</a> has more on getting equipped.</p>"
    }
  ];

  function initFaithQA() {
    var list = document.getElementById("faith-list");
    if (!list) return;
    var search = document.getElementById("faith-search");
    var empty = document.getElementById("faith-empty");

    function render(items) {
      list.innerHTML = "";
      if (!items.length) {
        if (empty) empty.classList.remove("hidden");
        return;
      }
      if (empty) empty.classList.add("hidden");
      items.forEach(function (item, i) {
        var wrap = document.createElement("div");
        wrap.className = "glass-card rounded-xl overflow-hidden";

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faith-q w-full text-left flex items-center justify-between gap-4 p-stack-md border border-transparent rounded-xl";
        btn.setAttribute("aria-expanded", "false");
        btn.innerHTML =
          '<span class="font-headline-sm text-headline-sm text-on-surface pr-2">' + item.q + '</span>' +
          '<span class="material-symbols-outlined text-tertiary chevron shrink-0">expand_more</span>';

        var ans = document.createElement("div");
        ans.className = "faith-answer";
        ans.innerHTML =
          '<div class="px-stack-md pb-stack-md pt-2 font-body-md text-body-md text-on-surface-variant space-y-3">' +
          item.a + '</div>';

        btn.addEventListener("click", function () {
          var isOpen = ans.classList.contains("open");
          // close siblings
          list.querySelectorAll(".faith-answer.open").forEach(function (o) { o.classList.remove("open"); });
          list.querySelectorAll(".faith-q.active").forEach(function (o) {
            o.classList.remove("active");
            o.setAttribute("aria-expanded", "false");
            var c = o.querySelector(".chevron");
            if (c) c.style.transform = "";
          });
          if (!isOpen) {
            ans.classList.add("open");
            btn.classList.add("active");
            btn.setAttribute("aria-expanded", "true");
            var chev = btn.querySelector(".chevron");
            if (chev) chev.style.transform = "rotate(180deg)";
          }
        });

        wrap.appendChild(btn);
        wrap.appendChild(ans);
        list.appendChild(wrap);
      });
    }

    render(FAITH_QA);

    if (search) {
      search.addEventListener("input", function () {
        var term = search.value.trim().toLowerCase();
        if (!term) { render(FAITH_QA); return; }
        var filtered = FAITH_QA.filter(function (item) {
          return (item.q + " " + (item.tags || "")).toLowerCase().indexOf(term) !== -1;
        });
        render(filtered);
      });
    }
  }

  /* ---------- Gospel video (YouTube lite-embed) ----------
     The poster loads instantly; the heavy YouTube iframe only loads
     on click. Set the video ID via data-video-id in index.html. */
  function initVideo() {
    var lite = document.getElementById("gospel-video");
    if (!lite) return;

    function showComingSoon() {
      lite.innerHTML =
        '<div class="water-tile grain aspect-video rounded-xl border border-white/10 flex items-center justify-center text-center px-6">' +
          '<div class="relative z-10">' +
            '<span class="material-symbols-outlined text-tertiary text-5xl mb-2 block">movie</span>' +
            '<p class="font-headline-sm text-headline-sm text-on-surface">The gospel video is coming soon.</p>' +
            '<p class="font-body-md text-body-md text-on-surface-variant mt-1">In the meantime, read the message just below.</p>' +
          '</div>' +
        '</div>';
    }

    function playVideo() {
      var id = (lite.getAttribute("data-video-id") || "").trim();
      if (!id || id === "YOUR_YOUTUBE_VIDEO_ID") {
        showComingSoon();
        return;
      }
      var frame = document.createElement("div");
      frame.className = "aspect-video rounded-xl overflow-hidden border border-white/10";
      var iframe = document.createElement("iframe");
      // youtube-nocookie = privacy-friendly embed; rel=0 limits end-screen clutter
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
      iframe.title = "The gospel message";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.setAttribute("frameborder", "0");
      iframe.className = "w-full h-full block";
      frame.appendChild(iframe);
      lite.innerHTML = "";
      lite.appendChild(frame);
    }

    lite.addEventListener("click", playVideo);
    lite.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        playVideo();
      }
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initYear();
    initCopyLinks();
    initReveal();
    initGospelAccordion();
    initDailyVerse();
    initVideo();
    initFaithQA();
  });
})();
