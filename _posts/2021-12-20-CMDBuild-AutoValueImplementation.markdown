---
layout: blog
title: "CMDBuild - Tricks - autoValue"
date: 2021-12-20 09:00:00 +0200
author: Andreas Marschke
description: CMDBuild is a CMDB from tecnoteca S.r.l. that is very powerful and very 
 nimble once you get to know it. In this post we'll explore implementing AutoValue's 
 in a form to improve your data-entry workflow
categories: cmdb cmdbuild ITSM autoValue
type: article
---

> {{ page.description }}

## CMDBuild as an CMDB-Solution

[CMDBuild](https://www.cmdbuild.org/) is one of the long standing solutions to manage information about your IT Infrastructure and Assets with
a lot of extensibility and ease of integration into your existing processes by way of a very powerful API implemented both for SOAP 
and REST interfaces allowing you to use it as the brain of your organizations inventory and asset management over time. 

Its very intuitive class-based [data modelling](https://www.cmdbuild.org/en/project/features/database-modeling) atop the [PostgreSQL Database](https://www.postgresql.org/) allows you
to let the asset management system grow as you grow your organization.

## Data Modelling based on Classes

Class are used for modelling and allow you to define the characteristics of an asset with various field types provided by the database as well as custom types and lookups.

<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-class.png"}}' alt="CMDBuild Class Definition"/>

Relations defined by Domains make for the interconnected details of your environment and your business.

<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-relations.png"}}' alt="CMDBuild Relationships designed as Domains"/>

## Cards and managing Information

Cards are instances of classes defining a specific asset or information item.

<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-card.png"}}' alt="CMDBuild card information"/>

## Data Input and How to make it Faster

Adding new data is fairly straight forward if you're going to use the frontend via editable card properties.

<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-card-edit.png"}}' alt="CMDBuild card editing form"/>

Now, adding all those items by hand can sometimes be cumbersome or error-prone when it comes to calculations or 
lookups and options. To solve this problem Automatic Values enable calculation of card attribute fields based on data input in other fields. 

Unfortunately this feature isn't all that well documentated - a small error that I'm sure is going to be fixed in future iterations - but
I'd like to show you my approach of using this feature.

Automatic Values (or autoValue[s]) can be defined in the attribute tab under the Administration Module.

<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-card-attributes.png"}}' alt="CMDBuild class attributes"/>

In the attribute detail view allows you to modify individual attribute data characteristics and constraints.

## How automatic values can be leveraged

Assuming a class `BillingItem` with the following general details for attributes:
<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-billing-item-attributes.png"}}' alt="CMDBuild attributes example."/>

We could input each of these fields individually by hand or calculate at least `NetAmount` representing the net amount of cost asked for a billing item.

AutoValues are defined as JavaScript inline evaluated scripts everytime you change a field during class input. Under the covers an AutoValue is a 
javascript function interacting with the current card or record you're editing.

Looking at the [source code](https://sourceforge.net/projects/cmdbuild/files/3.3.2/) we can find in the file `ui/app/util/helper/FormHelper.js`:


```js
/**
 * Add auto value script to field
 * @param {Object} config Ext.form.Field configuration
 * @param {Object} fieldMeta Field metadata
 * @param {Object} fieldMeta.validationRules Validation rules code
 * @param {String} linkname
 * @param {String} formmode One of `read`, `create` or `update`.
 */
addAutoValue: function (config, fieldMeta, linkname, formmode, activityLinkName) { ...
```

This is the method used when a new form is initialized and evaluates the javascript you defined in the 
`autoValue` field as a function with the parameter `api`:


```js
var jsfn = Ext.String.format(
    'function executeAutoValue(api) {{0}}',
    script
);
```

The object `api` passed into the function is defined like this:


```js
var api = Ext.apply({
    record: record,
    activity: activity,
    mode: formmode,
    setValue: function (value) {
        record.set(fieldMeta.name, value);
    }
}, CMDBuildUI.util.api.Client.getApiForFieldAutoValue());
```

This means you can modify the currently opened record in the function by accessing the `get` and `set` functions on
the `api.record` field to modify a given attributes or relations values.

For example adding the afforementioned `NetAmount` based on `amount` + `VAT` we can write it like so:


```js
var VAT = api.record.get("VAT");
var amount = api.record.get("Amount");

if (VAT && amount) {
  api.record.set("NetAmount", amount + amount * (VAT / 100));
}
```

Adding more for Amount based on rate and quantity to calculate the amount to come to the eventual net amount, we can now
concentrate on the information we want to collect while the rest is calculated for us:

<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-add-card-attributes-with-autovalue.gif"}}' alt="CMDBuild Auto Values in Action"/>

## Closing Words

CMDBuild is very powerful if you get the hang of it. I've grown to like it to manage assets even for my private environment simply because it allows 
me to manage all of my hardware and their warranties without having to rifle through piles of e-mails in my inbox or a drawer full of documents.
Allowing information to be at your fingertips at a moments notice is so valuable in an ever evolving It infrastructure.

## About CMDBuild

<img src='{{site.base_url}}{{"/assets/img/posts/cmdbuild/cmdbuild-logo.png"}}' class="cmdbuild-logo trademark" alt="CMDBuild Logo"/> is a registered trademark, [Tecnoteca srl](http://www.tecnoteca.com/)
