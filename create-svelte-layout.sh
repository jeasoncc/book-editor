#!/bin/bash
components=(app-entry layout-404 layout-book layout-home component-foot component-introduction component-login component-side constant-route)

for loop in ${components[@]}
do
    echo $loop
    bash create-svelte-component.sh "test" $loop
done
