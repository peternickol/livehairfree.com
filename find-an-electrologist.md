---
layout: page
title: Find an Electrologist
permalink: /find-an-electrologist/
description: Search and filter licensed electrologists by location and client availability.
seo_description: Use the Live Hair Free registry to find electrologists in Oregon and nearby areas by name, location, and current availability.
seo_image: /img/electrologists/electrologist-profile-placeholder.jpg
---

<div class="secotionTitle">
  <h2><span>Registry </span>Find an Electrologist</h2>
</div>

<p><strong>Search, filter, and sort trained electrologists</strong> by name, location, and current client availability.</p>

<div class="lhf-registry-controls row">
  <div class="col-md-5">
    <input id="registry-search" class="form-control" type="search" placeholder="Search by name, location, phrase, or website" />
  </div>
  <div class="col-md-4">
    <select id="registry-sort" class="form-control">
      <option value="random">Sort: Random</option>
      <option value="accepting">Sort: Accepting Clients First</option>
      <option value="name">Sort: Name (A-Z)</option>
      <option value="location">Sort: Location (A-Z)</option>
    </select>
  </div>
  <div class="col-md-3">
    <select id="registry-status" class="form-control">
      <option value="all">Status: All</option>
      <option value="yes">Status: Accepting Clients</option>
      <option value="no">Status: Not Accepting</option>
    </select>
    <button id="registry-clear" class="btn btn-secondary first-btn lhf-clear-filters" type="button">Clear Filters</button>
  </div>
</div>

<p class="lhf-registry-count"><strong><span id="registry-count">{{ site.data.electrologists | size }}</span></strong> providers shown</p>

<div id="registry-list" class="row lhf-registry-list">
  {% for person in site.data.electrologists %}
  <div class="col-md-6 registry-item"
       data-seq="{{ forloop.index0 }}"
       data-name="{{ person.name | downcase }}"
       data-location="{{ person.location | downcase }}"
       data-phrase="{{ person.phrase | downcase }}"
       data-website="{{ person.website | default: '' | downcase }}"
       data-accepting="{% if person.accepting_clients %}yes{% else %}no{% endif %}">
    <div class="lhf-registry-card">
      <div class="row">
        <div class="col-sm-5">
          {% assign registry_image = person.image | default: 'electrologist-profile-placeholder.jpg' %}
          {% if registry_image contains '://' %}
            {% assign registry_image_url = registry_image %}
          {% elsif registry_image contains '/' %}
            {% assign registry_image_url = registry_image | relative_url %}
          {% else %}
            {% assign registry_image_url = '/img/electrologists/' | append: registry_image | relative_url %}
          {% endif %}
          <img class="img-responsive lhf-registry-image" src="{{ registry_image_url }}" alt="{{ person.name }}" loading="lazy" decoding="async" />
        </div>
        <div class="col-sm-7">
          <h3>{{ person.name }}</h3>
          <h4>{{ person.location }}</h4>
          <p class="lhf-accepting {% if person.accepting_clients %}yes{% else %}no{% endif %}">
            <strong>{% if person.accepting_clients %}Accepting Clients{% else %}Not Accepting Clients{% endif %}</strong>
          </p>
          <p>{{ person.phrase }}</p>
          <p><a href="mailto:{{ person.email }}">{{ person.email }}</a></p>
          {% if person.website %}
          <p><a href="{{ person.website }}" target="_blank" rel="noopener">{{ person.website }}</a></p>
          {% endif %}
          <p><a href="tel:{{ person.phone | remove: '(' | remove: ')' | remove: '-' | remove: ' ' }}">{{ person.phone }}</a></p>
        </div>
      </div>
    </div>
  </div>
  {% endfor %}
</div>

<script>
  (function () {
    var searchEl = document.getElementById("registry-search");
    var sortEl = document.getElementById("registry-sort");
    var statusEl = document.getElementById("registry-status");
    var clearEl = document.getElementById("registry-clear");
    var countEl = document.getElementById("registry-count");
    var listEl = document.getElementById("registry-list");
    if (!searchEl || !sortEl || !statusEl || !clearEl || !listEl) return;
    var randomKey = "registryRandomOrder";

    function toArray(items) {
      return Array.prototype.slice.call(items);
    }

    toArray(listEl.querySelectorAll(".registry-item")).forEach(function (item) {
      item.dataset[randomKey] = String(Math.random());
    });

    function applyRegistry() {
      var search = searchEl.value.trim().toLowerCase();
      var status = statusEl.value;
      var sort = sortEl.value;
      var items = toArray(listEl.querySelectorAll(".registry-item"));

      items.sort(function (a, b) {
        if (sort === "random") {
          return Number(a.dataset[randomKey]) - Number(b.dataset[randomKey]);
        }
        if (sort === "name") {
          var nameCmp = a.dataset.name.localeCompare(b.dataset.name);
          if (nameCmp !== 0) return nameCmp;
          return Number(a.dataset.seq) - Number(b.dataset.seq);
        }
        if (sort === "location") {
          var locationCmp = a.dataset.location.localeCompare(b.dataset.location);
          if (locationCmp !== 0) return locationCmp;
          return Number(a.dataset.seq) - Number(b.dataset.seq);
        }
        var aAccepting = a.dataset.accepting === "yes" ? 1 : 0;
        var bAccepting = b.dataset.accepting === "yes" ? 1 : 0;
        if (bAccepting !== aAccepting) return bAccepting - aAccepting;
        var acceptingNameCmp = a.dataset.name.localeCompare(b.dataset.name);
        if (acceptingNameCmp !== 0) return acceptingNameCmp;
        return Number(a.dataset.seq) - Number(b.dataset.seq);
      });

      items.forEach(function (item) {
        listEl.appendChild(item);
      });

      var visible = 0;
      items.forEach(function (item) {
        var matchesSearch =
          !search ||
          item.dataset.name.indexOf(search) >= 0 ||
          item.dataset.location.indexOf(search) >= 0 ||
          item.dataset.phrase.indexOf(search) >= 0 ||
          item.dataset.website.indexOf(search) >= 0;
        var matchesStatus = status === "all" || item.dataset.accepting === status;
        var show = matchesSearch && matchesStatus;
        item.style.display = show ? "" : "none";
        if (show) visible += 1;
      });

      countEl.textContent = String(visible);
    }

    searchEl.addEventListener("input", applyRegistry);
    sortEl.addEventListener("change", applyRegistry);
    statusEl.addEventListener("change", applyRegistry);
    clearEl.addEventListener("click", function () {
      searchEl.value = "";
      sortEl.value = "random";
      statusEl.value = "all";
      applyRegistry();
    });
    applyRegistry();
  })();
</script>
