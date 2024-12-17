<script lang="ts">
  import { goto } from "$app/navigation";
  let { children } = $props();

  let selectedHall = $state(0);
  let startDatetime = $state(new Date());
  const end = new Date()
  end.setDate(startDatetime.getDate() + 1)
  let endDatetime = $state(end);


  function onHallChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    goto(`/book/${target.value}`);
  }

  const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
</script>

<form>
  <select name="hall" value={selectedHall} onchange={onHallChange}>
    <option value={0}>Aryabhatta</option>
    <option value={1}>Bhaskara</option>
    <option value={2}>Chanakya</option>
    <option value={3}>OAT</option>
  </select>
  <input type="datetime-local" name="starting-time" id="ending-time" value={convertToDateTimeLocalString(startDatetime)} max={convertToDateTimeLocalString(endDatetime)}/>
  <input type="datetime-local" name="ending-time" id="ending-time" value={convertToDateTimeLocalString(endDatetime)} min={convertToDateTimeLocalString(startDatetime)}/>

  <p>Selected Hall: {selectedHall}</p>
  {@render children()}
</form>

<svelte:head>
  <title>Book Halls</title>
</svelte:head>
